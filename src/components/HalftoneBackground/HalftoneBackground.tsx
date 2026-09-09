'use client'

// Portable version of the halftone/mouse-trail effect for use as a full-page
// background in a React/Next.js app. Differences from the demo in src/main.js:
//   - No drag-and-drop upload UI — the video source is a fixed prop.
//   - Pauses rendering when the tab is hidden or the background scrolls
//     out of view (IntersectionObserver), since it's decorative chrome and
//     shouldn't burn GPU/battery off-screen.
//   - Respects prefers-reduced-motion by freezing the cursor-trail sim
//     (the halftone itself is still drawn, just static).
//   - Disposes every GPU resource on unmount (safe for Next.js route changes
//     / React StrictMode double-invoke in dev).

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { vertexShader, fragmentShader, trailFragmentShader } from './shaders'
import './HalftoneBackground.css'

const ATLAS_CELL = 128
const TRAIL_RES = 500
const MAX_RADIUS = 244
const RADIUS_STEP = 16
const SPEED_TO_RADIUS = 0.1
const MOMENTUM_RATE = 8.0

interface HalftoneBackgroundProps {
    videoSrc: string
    svgUrls: string[]
    bgColor?: string
}

export default function HalftoneBackground({ videoSrc, svgUrls, bgColor = '#ffffff' }: HalftoneBackgroundProps) {
    const wrapRef = useRef<HTMLDivElement>(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const canvasWrap = wrapRef.current
        if (!canvasWrap) return

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        let disposed = false

        // ── Renderer ──────────────────────────────────────────────
        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
        camera.position.z = 1

        const renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(canvasWrap.clientWidth, canvasWrap.clientHeight)
        // Absolutely position the canvas so it fills the wrapper without
        // pushing sibling gradient divs out of place on any viewport size.
        const canvas = renderer.domElement
        canvas.style.position = 'absolute'
        canvas.style.inset = '0'
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvasWrap.appendChild(canvas)

        const fallback = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1, THREE.RGBAFormat)
        fallback.needsUpdate = true

        // ── Trail ping-pong FBOs ──────────────────────────────────
        const trailRT = [0, 1].map(() => new THREE.WebGLRenderTarget(TRAIL_RES, TRAIL_RES, {
            type: THREE.HalfFloatType,
            format: THREE.RGBAFormat,
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            depthBuffer: false,
        }))
        let rtRead = 0, rtWrite = 1

        const trailUniforms: Record<string, THREE.IUniform> = {
            uPrev: { value: trailRT[0].texture },
            uMousePos: { value: new THREE.Vector2(-9999, -9999) },
            uResolution: { value: new THREE.Vector2(canvasWrap.clientWidth, canvasWrap.clientHeight) },
            uDeltaTime: { value: 0 },
            uRadius: { value: 0 },
            uMouseOnCanvas: { value: false },
        }
        let prevMouseX: number | null = null, prevMouseY: number | null = null, momentumSpeed = 0

        const trailMaterial = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader: trailFragmentShader,
            uniforms: trailUniforms,
            glslVersion: THREE.GLSL3,
        })
        const trailScene = new THREE.Scene()
        const trailGeo = new THREE.PlaneGeometry(2, 2)
        trailScene.add(new THREE.Mesh(trailGeo, trailMaterial))

        // ── Main uniforms/mesh ────────────────────────────────────
        const uniforms: Record<string, THREE.IUniform> = {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(canvasWrap.clientWidth, canvasWrap.clientHeight) },
            uTexture: { value: fallback },
            uAtlas: { value: fallback },
            uTexRatio: { value: new THREE.Vector2(1, 1) },
            uImgSize: { value: new THREE.Vector2(1, 1) },
            uTexHasMipmaps: { value: false },
            uHasImage: { value: false },
            uBgColor: { value: new THREE.Color(bgColor) },
            uTrailMap: { value: trailRT[0].texture },
        }
        const mainMaterial = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, glslVersion: THREE.GLSL3 })
        const mainGeo = new THREE.PlaneGeometry(2, 2)
        scene.add(new THREE.Mesh(mainGeo, mainMaterial))

        // ── Atlas ─────────────────────────────────────────────────
        let atlasTexture: THREE.CanvasTexture | null = null
        function loadImg(url: string): Promise<HTMLImageElement> {
            return new Promise((resolve, reject) => {
                const img = new Image()
                img.onload = () => resolve(img)
                img.onerror = reject
                img.src = url
            })
        }
        Promise.all(svgUrls.map(loadImg)).then((imgs) => {
            if (disposed) return
            const canvas = document.createElement('canvas')
            canvas.width = ATLAS_CELL * 6
            canvas.height = ATLAS_CELL
            const ctx = canvas.getContext('2d')!
            imgs.forEach((img, i) => ctx.drawImage(img, i * ATLAS_CELL, 0, ATLAS_CELL, ATLAS_CELL))
            atlasTexture = new THREE.CanvasTexture(canvas)
            atlasTexture.minFilter = THREE.LinearFilter
            atlasTexture.magFilter = THREE.LinearFilter
            atlasTexture.needsUpdate = true
            uniforms.uAtlas.value = atlasTexture
        }).catch(console.error)

        // ── Cover-fit ─────────────────────────────────────────────
        let loadedImgSize: { w: number; h: number } | null = null
        function updateTexRatio() {
            if (!loadedImgSize || !canvasWrap) return
            const ca = canvasWrap.clientWidth / canvasWrap.clientHeight
            const ia = loadedImgSize.w / loadedImgSize.h
            uniforms.uTexRatio.value.set(Math.min(ca / ia, 1), Math.min(ia / ca, 1))
        }

        // ── Fixed background video ────────────────────────────────
        const videoEl = document.createElement('video')
        videoEl.loop = true
        videoEl.muted = true
        videoEl.playsInline = true
        videoEl.src = videoSrc
        let videoTex: THREE.VideoTexture | null = null

        function onLoadedMetadata() {
            if (disposed) return
            videoTex = new THREE.VideoTexture(videoEl)
            videoTex.colorSpace = THREE.SRGBColorSpace
            videoTex.minFilter = THREE.LinearFilter
            videoTex.magFilter = THREE.LinearFilter

            loadedImgSize = { w: videoEl.videoWidth, h: videoEl.videoHeight }
            uniforms.uTexture.value = videoTex
            uniforms.uImgSize.value.set(loadedImgSize.w, loadedImgSize.h)
            uniforms.uHasImage.value = true
            updateTexRatio()
            videoEl.play().catch(() => { })
            setReady(true)
        }
        videoEl.addEventListener('loadedmetadata', onLoadedMetadata, { once: true })

        // ── Mouse tracking ────────────────────────────────────────
        function onPointerMove(e: PointerEvent) {
            const r = canvasWrap!.getBoundingClientRect()
            const x = e.clientX - r.left
            const y = r.height - (e.clientY - r.top) // Y-flip to match vUv
            trailUniforms.uMousePos.value.set(x, y)
            trailUniforms.uMouseOnCanvas.value = x >= 0 && x <= r.width && y >= 0 && y <= r.height
        }
        window.addEventListener('pointermove', onPointerMove)

        // ── Resize ────────────────────────────────────────────────
        const ro = new ResizeObserver(() => {
            const w = canvasWrap.clientWidth
            const h = canvasWrap.clientHeight
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            renderer.setSize(w, h)
            uniforms.uResolution.value.set(w, h)
            trailUniforms.uResolution.value.set(w, h)
            updateTexRatio()
            renderer.render(scene, camera)
        })
        ro.observe(canvasWrap)

        // ── Pause when off-screen / tab hidden ───────────────────
        let isIntersecting = true
        const io = new IntersectionObserver(([entry]) => { isIntersecting = entry.isIntersecting }, { threshold: 0 })
        io.observe(canvasWrap)

        // ── Render loop ───────────────────────────────────────────
        const clock = new THREE.Clock()
        let rafId: number

        function animate() {
            rafId = requestAnimationFrame(animate)
            if (document.hidden || !isIntersecting) return

            const delta = Math.min(clock.getDelta(), 0.1)
            uniforms.uTime.value = clock.getElapsedTime()

            if (!prefersReduced) {
                trailUniforms.uPrev.value = trailRT[rtRead].texture
                trailUniforms.uDeltaTime.value = delta

                const mx = trailUniforms.uMousePos.value.x
                const my = trailUniforms.uMousePos.value.y
                let instantSpeed = 0
                if (prevMouseX !== null && prevMouseY !== null && trailUniforms.uMouseOnCanvas.value) {
                    instantSpeed = Math.hypot(mx - prevMouseX, my - prevMouseY) / delta
                }
                prevMouseX = mx
                prevMouseY = my

                const smoothing = 1 - Math.exp(-MOMENTUM_RATE * delta)
                momentumSpeed += (instantSpeed - momentumSpeed) * smoothing
                // Power curve (>1) makes the radius grow slowly at moderate speeds
                // and only reach MAX_RADIUS at genuinely fast mouse movement.
                const normalized = Math.min(1, momentumSpeed * SPEED_TO_RADIUS / MAX_RADIUS)
                const targetRadius = Math.pow(normalized, 2) * MAX_RADIUS
                trailUniforms.uRadius.value = Math.round(targetRadius / RADIUS_STEP) * RADIUS_STEP

                renderer.setRenderTarget(trailRT[rtWrite])
                renderer.render(trailScene, camera)
                renderer.setRenderTarget(null);
                [rtRead, rtWrite] = [rtWrite, rtRead]
                uniforms.uTrailMap.value = trailRT[rtRead].texture
            }

            if (videoTex) videoTex.needsUpdate = true
            renderer.render(scene, camera)
        }
        animate()

        return () => {
            disposed = true
            cancelAnimationFrame(rafId)
            ro.disconnect()
            io.disconnect()
            window.removeEventListener('pointermove', onPointerMove)
            videoEl.removeEventListener('loadedmetadata', onLoadedMetadata)
            videoEl.pause()
            videoEl.removeAttribute('src')
            videoEl.load()

            trailRT.forEach((rt) => rt.dispose())
            trailGeo.dispose()
            trailMaterial.dispose()
            mainGeo.dispose()
            mainMaterial.dispose()
            fallback.dispose()
            if (atlasTexture) atlasTexture.dispose()
            if (videoTex) videoTex.dispose()

            renderer.dispose()
            if (canvas.parentNode === canvasWrap) {
                canvasWrap.removeChild(canvas)
            }
        }
    }, [videoSrc, svgUrls, bgColor])

    return (
        <div
            ref={wrapRef}
            aria-hidden="true"
            className="halftone-background"
            style={{
                opacity: ready ? 1 : 0,
                transition: 'opacity 1.2s ease-out',
            }}
        >
            {/* Top fade-to-white gradient */}
            <div className="halftone-fade halftone-fade-top" />
            {/* Bottom fade-to-white gradient */}
            <div className="halftone-fade halftone-fade-bottom" />
        </div>
    )
}

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeJsHero.css';

export function ThreeJsHero() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const getSize = () => ({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        });

        const { width, height } = getSize();

        const scene = new THREE.Scene();
        scene.background = null;

        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);

        const getCameraY = () => {
            const base = window.screen.width > 1664 ? 50 : 42;
            return base / window.devicePixelRatio;
        };

        camera.position.set(0, getCameraY(), 0);
        camera.rotation.set(-Math.PI / 2, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        const pointLight = new THREE.PointLight(0xffffff, 1000);
        pointLight.position.set(0, 35, 0);
        pointLight.decay = 1.4;
        pointLight.distance = 400;

        const ambientLight = new THREE.AmbientLight(0xffffff, 2.9);

        scene.add(pointLight, ambientLight);

        let glbModel: THREE.Object3D | null = null;

        (async () => {
            try {
                const mod = await import('three/examples/jsm/loaders/GLTFLoader.js');
                const GLTFLoader = mod.GLTFLoader;
                const gltfLoader = new GLTFLoader();
                gltfLoader.load('https://samorlopez.github.io/samorlopez-logo/samorlopez_v8.glb', (gltf: any) => {
                    if (glbModel) {
                        scene.remove(glbModel);
                    }
                    glbModel = gltf.scene as THREE.Object3D;
                    glbModel!.position.set(0, 0, 0);

                    const initialScale = getSize().width / 130;
                    glbModel!.scale.set(initialScale, initialScale, initialScale);

                    scene.add(glbModel!);
                });
            } catch (err) {
                console.error('Failed to load GLTFLoader', err);
            }
        })();

        let targetLightPos = { x: pointLight.position.x, z: pointLight.position.z };

        const handleMouseMove = (event: MouseEvent) => {
            const mouseX = (event.clientX / getSize().width) * 2 - 1;
            const mouseY = -(event.clientY / getSize().height) * 2 + 1;
            targetLightPos.x = mouseX * 50;
            targetLightPos.z = -mouseY * 50;
        };

        const handleResize = () => {
            const { width, height } = getSize();

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
            renderer.setPixelRatio(window.devicePixelRatio);

            camera.position.set(0, getCameraY(), 0);

            if (glbModel) {
                const scale = width / 130;
                glbModel.scale.set(scale, scale, scale);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        window.visualViewport?.addEventListener('resize', handleResize);

        let rafId = 0;
        function animate() {
            rafId = requestAnimationFrame(animate);

            const smoothing = 0.035;
            pointLight.position.x += (targetLightPos.x - pointLight.position.x) * smoothing;
            pointLight.position.z += (targetLightPos.z - pointLight.position.z) * smoothing;

            renderer.render(scene, camera);
        }

        animate();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            window.visualViewport?.removeEventListener('resize', handleResize);
            if (glbModel) {
                scene.remove(glbModel);
            }
            renderer.forceContextLoss && renderer.forceContextLoss();
            renderer.domElement && renderer.domElement.remove();
            renderer.dispose();
        };
    }, []);

    return <div className="threejs-hero" ref={containerRef} />;
}

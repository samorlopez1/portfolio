import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeJsHero.css';

export function ThreeJsHero() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        scene.background = null;
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

        if (window.screen.width > 1664) {
            camera.position.set(0, 50, 0);
        } else {
            camera.position.set(0, 42, 0);
        }
        camera.rotation.set(-Math.PI / 2, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
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

                    const initialScale = window.innerWidth / 65;
                    glbModel!.scale.set(initialScale, initialScale, initialScale);

                    scene.add(glbModel!);
                });
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('Failed to load GLTFLoader', err);
            }
        })();

        let targetLightPos = { x: pointLight.position.x, z: pointLight.position.z };

        window.addEventListener('mousemove', (event) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            targetLightPos.x = mouseX * 50;
            targetLightPos.z = -mouseY * 50;
        });

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);

            if (glbModel) {
                const scale = window.innerWidth / 65;
                glbModel.scale.set(scale, scale, scale);
            }
        });

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

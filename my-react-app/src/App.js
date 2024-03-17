import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { BallText } from './textUtils'; 

function App() {
  const mountRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.2);
    light2.position.set(0, 0, 1).normalize();
    scene.add(light2);
    

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xff00ff });
    const sphere = new THREE.Mesh(geometry, material);

    const texture = BallText('Googogaga');
    sphere.material.map = texture;

    scene.add(sphere);



    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

return <div ref={mountRef} />;
}

export default App;

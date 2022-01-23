import './style.css'
import * as THREE from 'three'
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Time
// let time = Date.now();

// const clock = new THREE.Clock();

// Animation with Green Sock.
// gsap.to(mesh.position, {x: 2, duration: 1, delay: 1});

// Animations
const tick = () => {
    // to normalize the animation regardless of the fps
    // const currentTime = Date.now();
    // const deltaTime = currentTime - time;
    //time = currentTime;
    // console.log(deltaTime);

    // const elapsedTime = clock.getElapsedTime();

    // Update Object
    // mesh.rotation.y += 1 * deltaTime;

    // mesh.rotation.y = elapsedTime;
    // mesh.position.y = Math.sin(elapsedTime);
    // mesh.position.x = Math.cos(elapsedTime);
    // camera.position.y = Math.sin(elapsedTime);
    // camera.position.x = Math.cos(elapsedTime);
    // camera.lookAt(mesh.position);

    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();
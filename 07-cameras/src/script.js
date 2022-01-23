import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



/*
Cursor 
*/
const cursor = {
    x: 0,
    y: 0
};
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);
    // De -0.5 - 0.5
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(
    75, // Recoment between 45-75
    sizes.width / sizes.height, // Ratio
    0.1, // Less than 0 will be displayed
    100 // More than this value is not be displayed
    );
// We shou avoid z-figthing
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio, // Left
//     1 * aspectRatio, // Right
//     1, // Top
//     -1, // Bottom
//     0.1,
//     100
// )

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

const controls = new OrbitControls(camera, canvas);
// controls.target.y = 2;
// controls.update();
controls.enableDamping = true;
// To relentize effect


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Update Camera
    // camera.position.x = cursor.x * 10;
    // camera.position.y = cursor.y * 10;
    // camera.position.x = Math.sin(cursor.x * (Math.PI * 2)) * 3;
    // camera.position.z = Math.cos(cursor.x * (Math.PI * 2)) * 3;
    // camera.position.y = cursor.y * 5;
    // Ex:
    // x: 0.5
    // 0.5 + 6.18 = 3.09
    // Sin(3.09) = 0.05
    // camera.lookAt(mesh.position);

    // To do the damping to work
    controls.update();

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
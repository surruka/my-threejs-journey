import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Blending } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png');

/**
 * Particles
 */
// const particlesGeometry = new THREE.SphereBufferGeometry(1, 32, 32);
const particlesGeometry = new THREE.BufferGeometry();
const count = 25000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3); // 3 because is RGB

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random();
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)

particlesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
)

const particlesMaterials = new THREE.PointsMaterial({
    // color: '#ffcc00',
    transparent: true,
    alphaMap: particleTexture,
    size: 0.1,
    sizeAttenuation: true, // Apply perspective
    // map: particleTexture
    // alphaTest: 0.001. It can be good but enough
    // To make transparency completely
    // depthTest: false,
    // depthTest create bug with other objects in the scene
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true, // To use difference colors. Base colors in mixing with the vertexCOlors
    // Blending between particles. Can impact the performance
});
const particles = new THREE.Points(particlesGeometry, particlesMaterials);
scene.add(particles);




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update Particles. Always before the renders
    // particles.rotation.y = elapsedTime * 0.02;
    particlesGeometry.attributes.position.array

    for(let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = particlesGeometry.attributes.position.array[i3 + 0];
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
        // Bad idea because we are animating too much
        // To access the Y in the array
    }

    particlesGeometry.attributes.position.needsUpdate = true;
    // We must make three.js know to be reflected the changes


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
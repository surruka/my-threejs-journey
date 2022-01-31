import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { HemisphereLight } from 'three'
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper';

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
 * Lights
 */
// MeshStandardMAterial need light
// Ambient Light is applied in every direction. Good to simulate light bouncing
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.5);
directionalLight.position.set(1, 0.25, 0)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.01);
scene.add(directionalLight);

// Come from everywhere
const hemisphere = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.5);
scene.add(hemisphere);
gui.add(hemisphere, 'intensity').min(0).max(1).step(0.01);

// Point that iluminate in every direction
// Disntance is import to define until which point a light impact the meshes
const pointLight = new THREE.PointLight(0xff9900, 0.5, 10);
pointLight.position.set(1, -0.5, 1)
gui.add(pointLight, 'intensity').min(0).max(1).step(0.01);
scene.add(pointLight);

// Just work with physical material or standard material
const reactAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
reactAreaLight.position.set(-1.5, 0, 1.5);
reactAreaLight.lookAt(new THREE.Vector3(0, 0, 0));
gui.add(reactAreaLight, 'intensity').min(0).max(1).step(0.01);
scene.add(reactAreaLight);

const spotLight = new THREE.SpotLight(0x78ff00,
    0.5,
    10, // DIstance
    Math.PI * 0.1, // Angle
    0.25, //Penumbra. Blurry at the edge
    1 // Decay. Limit the light at the end
    );
spotLight.position.set(0, 2, 3);
scene.add(spotLight);
spotLight.target.position.x = -1;
scene.add(spotLight.target);

/**
 * Light Helpers
 * 
 */

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphere, 0.2);
scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);
window.requestAnimationFrame(() => {
    spotLightHelper.update();
})

const reactAreaLightHelper = new RectAreaLightHelper(reactAreaLight);
scene.add(reactAreaLightHelper);

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
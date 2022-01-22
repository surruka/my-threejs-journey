import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x = 2;
// mesh.position.y = -2;
// mesh.position.z = -2;
// mesh.position.set(2, -2, -2);
// scene.add(mesh)

// Group of meshes and use rotatio, position, scale, etc..
// with this
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'blue'})
);
group.add(cube1);
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'red'})
)
cube2.position.x = -2;
group.add(cube2);
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'green'})
)
cube3.position.x = 2;
group.add(cube3);
group.rotateY(Math.PI / 2)

// AxesHelper. Help us to visualized axes
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// Vector 3. Mesh.position. Length distance from the 
// vector and position of the screen
// console.log(mesh.position.length());

// Normalize. Take the vector the length to 1
// mesh.position.normalize();

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 1;
// mesh.scale.set(2, 2, 1);

// Rotation. The value of theses access is express in radians
// mesh.rotation.y = 2;
// The order of the rotation matter
// mesh.rotation.y = Math.PI; // Half rotation
// Reorder to specify our priorities
// mesh.rotation.reorder('YXZ');

// Quotanion. Representation of rotation
// in a mathematical way

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.y = 3
scene.add(camera)

// Get the distance from the camera
// console.log(mesh.position.distanceTo(camera.position));

// Look at
// camera.lookAt(new THREE.Vector3(3,0,0));
camera.lookAt(group.position);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
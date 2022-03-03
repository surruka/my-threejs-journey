// Scene
const scene = new THREE.Scene();

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 'red'});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Size
const sizes = {
    width: 800,
    height: 600
};

// Camara (the point of view)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
// camera.position.x = 2;
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const rendered = new THREE.WebGLRenderer({
    canvas
});
rendered.setSize(sizes.width, sizes.height);

rendered.render(scene, camera);
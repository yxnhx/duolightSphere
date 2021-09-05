import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load('/texture-folder/NormalMap.png') ;

// Debug - close and open control
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene - bassic (set and forget for begnnerr)
const scene = new THREE.Scene();

// Objects - geometry, physical shape
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64);

// Materialse - clothing 

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap   = normalTexture;

material.color = new THREE.Color(0xCECECE);

// Mesh - pull them together
const sphere = new THREE.Mesh(geometry,material);
scene.add(sphere);

// Lights -- lighting bebe

const pointLight = new THREE.PointLight(0x00FFFF, 0.1)
pointLight.position.set(2, 3, 4);

scene.add(pointLight)

// Lights 2 -- red light bbb

const pointLight2 = new THREE.PointLight(0xFF0000, 2)
pointLight2.position.set(0.35, 0.67, 0.89);
pointLight2.intensity = 3.45;

scene.add(pointLight2);

const light1 = gui.addFolder('Red light');

light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01);
light1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01);
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01);

const lightColour = {
    color: 0xff0000
};

light1.addColor(lightColour, 'color')
    .onChange(() => {
        pointLight2.color.set(lightColour.color);
    });

// Light 3

const light2 = gui.addFolder('Cyan light');

const pointLight3 = new THREE.PointLight(0x63F6FF, 2);
pointLight3.position.set(0.35, -0.74, 0.89);
pointLight3.intensity = 3.45;

scene.add(pointLight3);

light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01);
light2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01);
light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01);
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01);

const light2Colour = {
    color: 0x63F6FF
};

light2.addColor(light2Colour, 'color')
    .onChange(() => {
        pointLight3.color.set(light2Colour.color);
    })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

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
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove (event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .008;
}


window.addEventListener('scroll', updateSphere);



const clock = new THREE.Clock();

const tick = () =>
{
    targetX = mouseX* 0.001;
    targetY = mouseY* 0.001;

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime;

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y);
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x);
    sphere.position.z += -.02 * (targetY - sphere.rotation.x);

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const canvas = document.querySelector('canvas.webgl'); // Canvas
const scene = new THREE.Scene(); //Scene
const gui = new GUI(); // Debug

//==================== Textures =======================
// Get the image with Native-JavaScript
/* const image = new Image();
const texture = new THREE.Texture(image);
texture.colorSpace = THREE.SRGBColorSpace;
image.onload = () => {
  texture.needsUpdate = true;
};
image.src = '/textures/door/color.png'; */

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load(
  './textures/door/ambientOcclusion.jpg'
);
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load(
  './textures/door/metalness.jpg'
);
const doorRoughnessTexture = textureLoader.load(
  './textures/door/roughness.jpg'
);

const matcapTexture = textureLoader.load('./textures/matcaps/1.png');
const gradientTexture = textureLoader.load('./textures/gradients/5.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// We can send 3 functions after the path for debugging
/* const doorColorTexture = textureLoader.load(
  '/textures/door/color.jpg',
  () => {
    console.log('Load');
  },
  () => {
    console.log('Progress');
  },
  () => {
    console.log('Error');
  }
); */

// Add loadingManager 🗝️
/* const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log('loading started');
};
loadingManager.onLoad = () => {
  console.log('loading finished');
};
loadingManager.onProgress = () => {
  console.log('loading progressing');
};
loadingManager.onError = () => {
  console.log('loading error');
};
const textureLoader = new THREE.TextureLoader(loadingManager); */

//==================== Objects ========================
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color(0xff0000);
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.5;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

// const material = new THREE.MeshNormalMaterial();
// material.wireframe = true;
// material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// material.gradientMap = gradientTexture;
// gradientTexture.generateMipmaps = false;

/***** ((((((((((MeshStandardMaterial)))))))))) *****/
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1;
// material.roughness = 1;
// material.map = doorColorTexture;

// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;

// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;

// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;

// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);

// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// gui.add(material, 'roughness').min(0).max(1).step(0.0001);
// gui.add(material, 'metalness').min(0).max(1.2).step(0.0001);

/***** (((((MeshPhysicalMaterial))))) *****/
const material = new THREE.MeshPhysicalMaterial();
material.metalness = 0;
material.roughness = 0;

gui.add(material, 'roughness').min(0).max(1).step(0.0001);
gui.add(material, 'metalness').min(0).max(1.2).step(0.0001);

// material.map = doorColorTexture;

/*** AmbientOcclusion Map | add shadows where the texture is dark ***/
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;

/*** Displacement Map ***/
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;

/*** Metalness Map & Roughness Map ***/
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;

/*** Normal Map | fake the normal orientation + add details ***/
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);

/*** Alpha Map ***/
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

/*** Clearcoat ***/
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001);
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001);

/*** Sheen | usually on fluffy material like fabric ***/
// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);

// gui.add(material, 'sheen').min(0).max(1).step(0.0001);
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001);
// gui.addColor(material, 'sheenColor');

/*** Iridescence | creates color artifacts like a fuel puddle, soap bubbles ***/
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];

// gui.add(material, 'iridescence').min(0).max(1).step(0.0001);
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001);
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1);
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1);

/*** Transmission ***/
material.transmission = 1;
material.ior = 1.5; // index of reflection
material.thickness = 0.5;

gui.add(material, 'transmission').min(0).max(1).step(0.0001);
gui.add(material, 'ior').min(1).max(10).step(0.0001);
gui.add(material, 'thickness').min(0).max(1).step(0.0001);

//==================== Geometry
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.4, 0.2, 64, 128),
  material
);
torus.position.x = 1.5;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;

scene.add(plane, sphere, torus);

//====================== Lights ==========================
/* since the environment-map is contributing to the lighting
we can comment lights, otherwise it'll be too bright */

// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

//================= Environment Map ======================
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  scene.background = environmentMap;
  //to contributing the light of the objects with env
  scene.environment = environmentMap;
});

//==================== Resize Listener ===================
let width = window.innerWidth;
let height = window.innerHeight;

window.addEventListener('resize', () => {
  // Update sizes
  width = window.innerWidth;
  height = window.innerHeight;

  // Update camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//====================== Camera ==========================
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

//=================== Orbit Controls =====================
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//===================== Renderer =========================
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//==================== Animate ===========================
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  sphere.rotation.y = elapsedTime * 0.1;
  plane.rotation.y = elapsedTime * 0.1;
  torus.rotation.y = elapsedTime * 0.1;

  sphere.rotation.x = elapsedTime * -0.15;
  plane.rotation.x = elapsedTime * -0.15;
  torus.rotation.x = elapsedTime * -0.15;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

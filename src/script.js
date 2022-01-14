import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Car from "./Car.js";
import Ground from "./Ground";

//canvas
const c = document.getElementById("c");
document.addEventListener("DOMContentLoaded", () => {
  c.style.opacity = 1;
});

//secene
const scene = new THREE.Scene();
const canvas = document.querySelector("canvas");

//object
const car = new Car();
const ground = new Ground();

scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

scene.add(car);
scene.add(ground);

//camera
let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  90,
  sizes.width / sizes.height,
  1,
  100
);
camera.position.y = 12;
camera.position.z = 17;
camera.position.x = 18;

scene.add(camera);

//light
const directionalLight = new THREE.DirectionalLight("#ffffff", 0.9);
const ambientLight = new THREE.AmbientLight(0xdc8874, 0.9);
const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

directionalLight.castShadow = true;
ambientLight.castShadow = true;
hemisphereLight.castShadow = true;

directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.left = -100;
directionalLight.shadow.camera.bottom = -100;
directionalLight.shadow.camera.far = 20;
directionalLight.position.set(0, 20, 10);
directionalLight.shadow.mapSize.set(2048, 2048);
directionalLight.shadow.bias = -0.05;

scene.add(directionalLight);
scene.add(ambientLight);
scene.add(hemisphereLight);

//Car

//controller
const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  powerPreference: "high-performance",
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color("#1c1624"));

renderer.shadowMap.enabled = true;

//resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//Animatie
const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deletaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  ground.rotation.z += deletaTime * 0.5;

  controls.update();

  renderer.render(scene, camera);
  moveCar(elapsedTime);
  window.requestAnimationFrame(tick);
};

tick();

function moveCar(elapsedTime) {
  car.children[2].rotation.y += 1;
  car.children[3].rotation.y += 1;
  car.children[4].rotation.y += 1;
  car.children[5].rotation.y += 1;

  car.rotation.z = 0.06 * Math.sin(elapsedTime * 5);
}

//star
const loader = new THREE.TextureLoader();

const geometry = new THREE.BufferGeometry();
geometry.setAttribute(
  "position",
  new THREE.BufferAttribute(getRandomParticelPos(350), 3)
);

const getRandomParticelPos = (particleCount) => {
  const arr = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    arr[i] = (Math.random() - 0.5) * 10;
  }
  return arr;
};

const material = new THREE.PointsMaterial({
  size: 0.05,
  map: loader.load(
    "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"
  ),
  transparent: true,
  // color: 0x44aa88
});

const stars = new THREE.Mesh(geometry, material);

scene.add(stars);

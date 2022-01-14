import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Car from "./Car.js";
import Ground from "./Ground";

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
camera.position.y = 16;
camera.position.z = 15;
camera.position.x = 9;

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

  powerPreference: "high-performance",
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

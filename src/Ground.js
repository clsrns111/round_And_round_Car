import * as THREE from "three";
import Tree from "./Tree";
import Cloud from "./Cloud";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class Ground {
  constructor() {
    this.Colors = {
      red: "#FF423E",
      white: 0xd8d0d1,
      brown: "#444444",
      pink: 0xf5986e,
      brownDark: 0x23190f,
      blue: 0x68c3c0,
      silver: "#999593",
      yellow: "#FEFD0D",
      green: "#08631A",
    };

    this.ground = new THREE.Group();

    this.road = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(10.05, 10.05, 2, 50),
      new THREE.MeshLambertMaterial({ color: "#424242" })
    );
    this.road.castShadow = true;
    this.road.receiveShadow = true;
    this.road.rotation.x = Math.PI / 2;
    this.ground.add(this.road);

    this.line1 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(10.06, 10.06, 0.15, 50),
      new THREE.MeshLambertMaterial({ color: this.Colors.white })
    );
    // this.line.rotation.x = Math.PI / 2;
    this.line1.position.y = -0.8;
    this.road.add(this.line1);

    this.line2 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(10.06, 10.06, 0.15, 50),
      new THREE.MeshLambertMaterial({ color: this.Colors.white })
    );
    // this.line.rotation.x = Math.PI / 2;
    this.line2.position.y = 0.8;
    this.road.add(this.line2);

    this.line3 = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(10.051, 10.051, 0.15, 48),
      new THREE.MeshLambertMaterial({ color: this.Colors.white })
    );

    this.road.add(this.line3);

    // cloud
    for (let i = 0; i < 200; i++) {
      const stepAngle = Math.PI / 50; //cloud 수

      const a = stepAngle * i;

      const h = 18 + Math.random() * 2;

      const cloud = new Cloud();

      cloud.position.y = Math.sin(a) * h;
      cloud.position.x = Math.cos(a) * h;
      cloud.rotation.z = a + Math.PI / 2;
      cloud.position.z = -5 + Math.random() * 10;
      const s = Math.random() * 2;
      cloud.scale.set(s, s, s);
      this.ground.add(cloud);
    }

    //house
    //gltf loader
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/house1.glb", (gltf) => {
      const house = gltf.scene;
      this.ground.add(house);
      house.position.y = 11.3;
      house.position.z = 0.1;
      house.rotation.y = Math.PI;
      house.rotation.x = -0.3;

      gltf.scene.traverse((node) => {
        node.castShadow = true;
        node.receiveShadow = true;
      });

      house.scale.set(0.8, 0.8, 0.8);
    });

    gltfLoader.load("/coffee.glb", (gltf) => {
      const coffee = gltf.scene;
      this.ground.add(coffee);
      coffee.position.y = 6.35;
      coffee.position.x = 7;
      coffee.position.z = -1;
      coffee.rotation.z = -Math.PI / 5;
      coffee.rotation.x = -0.3;
      coffee.rotation.y = 0.25;
      gltf.scene.traverse((node) => {
        node.castShadow = true;
        node.receiveShadow = true;
      });

      coffee.scale.set(0.3, 0.3, 0.3);
    });

    //building1
    gltfLoader.load("/building.glb", (gltf) => {
      const building = gltf.scene;
      this.ground.add(building);
      building.position.y = -8.1;
      building.rotation.y = Math.PI;
      building.position.z = -5;
      building.position.x = -4.5;
      building.rotation.z = (Math.PI / 3) * 9.5;

      building.rotation.x = 0.1;
      gltf.scene.traverse((node) => {
        node.castShadow = true;
        node.receiveShadow = true;
      });

      building.scale.set(0.7, 0.7, 0.7);
    });
    //building2
    gltfLoader.load("/building2.glb", (gltf) => {
      const building = gltf.scene;
      this.ground.add(building);
      building.position.y = -12.8;
      building.rotation.y = Math.PI / 2;
      building.position.z = -2.2;
      building.rotation.x = 0.05;

      gltf.scene.traverse((node) => {
        node.castShadow = true;
        node.receiveShadow = true;
      });

      building.scale.set(0.7, 0.7, 0.7);
    });

    gltfLoader.load("/store.glb", (gltf) => {
      const store = gltf.scene;
      this.ground.add(store);

      store.rotation.z = Math.PI / 3 + Math.PI;
      store.rotation.x = 0.2;
      store.rotation.y = 0.2;

      store.position.x = 9;
      store.position.y = -4.8;
      store.position.z = -3;

      gltf.scene.traverse((node) => {
        node.castShadow = true;
        node.receiveShadow = true;
      });
      store.scale.set(0.7, 0.7, 0.7);
    });

    gltfLoader.load("/earth.glb", (gltf) => {
      const earth = gltf.scene;
      earth.rotation.y = Math.PI / 3;
      this.ground.add(earth);
      gltf.scene.traverse((node) => {
        node.castShadow = true;
        node.receiveShadow = true;
      });

      earth.scale.set(2.7, 2.7, 2.7);
    });

    //tree
    this.nTrees = 15;

    // Space the consistenly
    let stepAngle = (Math.PI * 4) / (this.nTrees - 5);

    for (let i = 0; i < this.nTrees; i++) {
      const tree = new Tree();
      tree.scale.set(0.3, 0.3, 0.3);

      let a = stepAngle * i;

      let h = 10;

      tree.position.y = Math.sin(a) * h;
      tree.position.x = Math.cos(a) * h;
      tree.position.z = -2.5;

      tree.rotation.z = a + (Math.PI / 2) * 3;

      this.ground.add(tree);
    }

    return this.ground;
  }
  createRoad() {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#424242";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(5, 48, 5, 10);

    return new THREE.CanvasTexture(canvas);
  }
}

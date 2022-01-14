import * as THREE from "three";

export default class Cloud {
  constructor() {
    this.cloud = new THREE.Group();

    const n = 3 + Math.floor(Math.random() * 3);

    for (let i = 0; i < n; i++) {
      const m = new THREE.Mesh(
        new THREE.DodecahedronBufferGeometry(0.5, 0),
        new THREE.MeshLambertMaterial({ color: "#ffffff" })
      );

      m.position.x = Math.random() + 0.1;
      m.position.z = Math.random() + 0.1;
      m.position.y = Math.random() + 2;

      var s = 0.1 + Math.random() * 0.9;
      m.scale.set(s, s, s);

      m.castShadow = true;
      m.receiveShadow = true;
      this.cloud.add(m);
    }
    return this.cloud;
  }
}

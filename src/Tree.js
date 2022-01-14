import * as THREE from "three";

export default class Tree {
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

    //tree
    this.tree = new THREE.Group();

    //stemp
    this.stemp = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(0.6, 0.6, 8, 20),
      new THREE.MeshLambertMaterial({ color: this.Colors.brown })
    );
    this.stemp.castShadow = true;
    this.stemp.receiveShadow = true;
    this.tree.add(this.stemp);

    for (let i = 0; i < Math.random() * 2 + 2; i++) {
      const cone = this.createCone();
      cone.position.y = i + 3;
      cone.scale.x = 2 - i * 0.3;
      cone.scale.y = 2 - i * 0.3;
      cone.scale.z = 2 - i * 0.3;

      cone.castShadow = true;
      cone.receiveShadow = true;
      this.stemp.add(cone);
    }

    return this.tree;
  }
  createCone() {
    const cone = new THREE.Mesh(
      new THREE.ConeBufferGeometry(1.8, 2, 4),
      new THREE.MeshLambertMaterial({ color: this.Colors.green })
    );

    return cone;
  }
}

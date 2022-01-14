import * as THREE from "three";

export default class Car {
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
    };

    this.car = new THREE.Group();
    this.body = new THREE.Mesh(
      new THREE.BoxBufferGeometry(4, 1, 2),
      new THREE.MeshLambertMaterial({ color: this.Colors.red })
    );
    this.car.add(this.body);

    //mirror Texture
    const frontTexture = this.createMirrorText2();
    frontTexture.center = new THREE.Vector2(0.5, 0.5);
    frontTexture.rotation = Math.PI / 2;

    const backTexture = this.createMirrorText2();
    backTexture.center = new THREE.Vector2(0.5, 0.5);
    backTexture.rotation = -Math.PI / 2;

    const leftTexture = this.createMirrorText();
    const rightTexture = this.createMirrorText();
    leftTexture.flipY = false;
    rightTexture.center = new THREE.Vector2(10, 10);
    //carbin
    this.carbin = new THREE.Mesh(new THREE.BoxBufferGeometry(2.5, 1.1, 2), [
      new THREE.MeshLambertMaterial({ map: frontTexture }),
      new THREE.MeshLambertMaterial({ map: backTexture }),
      new THREE.MeshLambertMaterial({ color: this.Colors.red }), //
      new THREE.MeshLambertMaterial({ color: this.Colors.red }), //left
      new THREE.MeshLambertMaterial({ map: leftTexture }), // top
      new THREE.MeshLambertMaterial({ map: rightTexture }),
    ]);
    this.carbin.position.y = 1;
    this.carbin.position.x = -0.75;

    this.carbin.castShadow = true;
    this.carbin.receiveShadow = true;

    this.car.add(this.carbin);

    //back wheel
    this.backwheel_left = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(0.5, 0.5, 0.4, 20),
      new THREE.MeshLambertMaterial({ color: this.Colors.brown })
    );

    this.backwheel_left.position.y = -0.5;
    this.backwheel_left.position.x = -1.2;
    this.backwheel_left.position.z = 0.9;
    this.backwheel_left.rotation.x = Math.PI / 2;
    this.backwheel_left.castShadow = true;
    this.backwheel_left.receiveShadow = true;

    this.car.add(this.backwheel_left);

    this.backwheel_right = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(0.5, 0.5, 0.4, 20),
      new THREE.MeshLambertMaterial({ color: this.Colors.brown })
    );

    this.backwheel_right.position.y = -0.5;
    this.backwheel_right.position.x = -1.2;
    this.backwheel_right.position.z = -0.9;
    this.backwheel_right.rotation.x = Math.PI / 2;
    this.backwheel_right.castShadow = true;
    this.backwheel_right.receiveShadow = true;

    this.car.add(this.backwheel_right);

    //front wheel
    this.frontwheel_left = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(0.5, 0.5, 0.4, 20),
      new THREE.MeshLambertMaterial({ color: this.Colors.brown })
    );

    this.frontwheel_left.position.y = -0.5;
    this.frontwheel_left.position.x = 1.2;
    this.frontwheel_left.position.z = 0.9;
    this.frontwheel_left.rotation.x = Math.PI / 2;
    this.frontwheel_left.castShadow = true;
    this.frontwheel_left.receiveShadow = true;

    this.car.add(this.frontwheel_left);

    //front wheel
    this.frontwheel_right = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(0.5, 0.5, 0.4, 20),
      new THREE.MeshLambertMaterial({ color: this.Colors.brown })
    );

    this.frontwheel_right.position.y = -0.5;
    this.frontwheel_right.position.x = 1.2;
    this.frontwheel_right.position.z = -0.9;
    this.frontwheel_right.rotation.x = Math.PI / 2;

    this.car.add(this.frontwheel_right);
    this.backwheel_left.add(this.createSilver());
    this.backwheel_right.add(this.createSilver());
    this.frontwheel_left.add(this.createSilver());
    this.frontwheel_right.add(this.createSilver());

    //head
    this.head = new THREE.Mesh(
      new THREE.BoxBufferGeometry(0.25, 0.5, 1.7),
      new THREE.MeshLambertMaterial({ color: this.Colors.red })
    );
    this.head.position.x = 2;
    this.head.position.y = 0.2;

    this.body.add(this.head);

    //head Light
    this.headLight_left = new THREE.Mesh(
      new THREE.BoxBufferGeometry(0.1, 0.3, 0.4),
      new THREE.MeshLambertMaterial({ Colors: this.Colors.yellow })
    );
    this.headLight_left.position.x = 0.2;
    this.headLight_left.position.z = 0.6;
    this.head.add(this.headLight_left);

    this.headLight_right = new THREE.Mesh(
      new THREE.BoxBufferGeometry(0.1, 0.3, 0.4),
      new THREE.MeshLambertMaterial({ Colors: this.Colors.yellow })
    );
    this.headLight_right.position.x = 0.2;
    this.headLight_right.position.z = -0.6;
    this.head.add(this.headLight_right);

    //silver haed
    this.silverHead = new THREE.Mesh(
      new THREE.BoxBufferGeometry(0.25, 0.3, 1.7),
      new THREE.MeshLambertMaterial({ color: this.Colors.silver })
    );
    this.silverHead.position.x = 2;
    this.silverHead.position.y = -0.3;

    this.body.add(this.silverHead);

    //Mirror
    this.leftMirror = this.createBackMirror();
    this.carbin.add(this.leftMirror);

    this.leftMirror.position.z = 1.1;
    this.leftMirror.position.x = 1;
    this.leftMirror.position.y = -0.2;

    this.rightMirror = this.createBackMirror();
    this.carbin.add(this.rightMirror);

    this.rightMirror.position.z = -1.1;
    this.rightMirror.position.x = 1;
    this.rightMirror.position.y = -0.2;

    //top
    this.frontTop = this.createTop();
    this.frontTop.position.y = 0.7;
    this.frontTop.position.x = 0.7;
    this.carbin.add(this.frontTop);

    this.backTop = this.createTop();
    this.backTop.position.y = 0.7;
    this.backTop.position.x = -0.7;
    this.carbin.add(this.backTop);

    this.car.scale.set(0.5, 0.5, 0.5);
    this.car.position.y = 10.5;

    return this.car;
  }
  createSilver() {
    const silver = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(0.2, 0.2, 0.5, 20),
      new THREE.MeshLambertMaterial({ color: this.Colors.silver })
    );

    return silver;
  }

  createPentagon() {
    const pentagon = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(0.15, 0.15, 0.6, 5),
      new THREE.MeshLambertMaterial({ color: this.Colors.silver })
    );

    return pentagon;
  }

  createBackMirror() {
    const backMirror = new THREE.Mesh(
      new THREE.BoxBufferGeometry(0.1, 0.3, 0.2),
      new THREE.MeshLambertMaterial({ color: this.Colors.red })
    );
    return backMirror;
  }

  createMirrorText() {
    const canavas = document.createElement("canvas");
    canavas.width = 100;
    canavas.height = 100;
    const ctx = canavas.getContext("2d");

    // ctx.fillStyle = "#ffffff";
    ctx.fillStyle = "#FF423E";
    ctx.fillRect(0, 0, canavas.width, canavas.height);

    ctx.fillStyle = "#40F1DF";
    ctx.fillRect(5, 20, 38, 70);
    ctx.fillRect(50, 20, 35, 70);

    return new THREE.CanvasTexture(canavas);
  }

  createMirrorText2() {
    const canavas = document.createElement("canvas");
    canavas.width = 100;
    canavas.height = 100;
    const ctx = canavas.getContext("2d");

    // ctx.fillStyle = "#ffffff";
    ctx.fillStyle = "#FF423E";
    ctx.fillRect(0, 0, canavas.width, canavas.height);

    ctx.fillStyle = "#40F1DF";
    ctx.fillRect(10, 10, 80, 80);

    return new THREE.CanvasTexture(canavas);
  }

  createTop() {
    const top = new THREE.Mesh(
      new THREE.BoxBufferGeometry(0.1, 0.1, 1.8),
      new THREE.MeshLambertMaterial({ color: this.Colors.red })
    );
    const leftleg = new THREE.Mesh(
      new THREE.BoxBufferGeometry(0.1, 0.2, 0.1),
      new THREE.MeshLambertMaterial({ color: this.Colors.red })
    );
    leftleg.position.z = 0.85;
    leftleg.position.y = -0.1;
    const rightleg = new THREE.Mesh(
      new THREE.BoxBufferGeometry(0.1, 0.2, 0.1),
      new THREE.MeshLambertMaterial({ color: this.Colors.red })
    );
    rightleg.position.z = -0.85;
    rightleg.position.y = -0.1;

    top.add(leftleg);
    top.add(rightleg);

    return top;
  }
}

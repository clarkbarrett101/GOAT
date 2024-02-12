import { Gyro } from "./gyro.js";
import { Reel } from "./reel.js";
import {} from "./gizmos.js";
import * as THREE from "https://unpkg.com/three/build/three.module.js";
// UpdateLoop() is the main loop of the program. It checks the current mode and runs the appropriate code. The loop repeats 10 times per second.

const scene = new THREE.Scene();
const scene2 = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene2.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(0xffffff, 0, 3);
scene2.fog = new THREE.Fog(0xffffff, 0, 3);
const camera = new THREE.PerspectiveCamera(75, 600 / 600, 0.1, 1000);
const camera2 = new THREE.PerspectiveCamera(75, 600 / 600, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const renderer2 = new THREE.WebGLRenderer();
renderer.setSize(600, 600);
renderer2.setSize(600, 600);
const liveView = document.getElementById("liveView");
liveView.appendChild(renderer.domElement);
const compareView = document.getElementById("compareView");
compareView.appendChild(renderer2.domElement);
const geometry = new THREE.ConeGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cylinder = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material2);
const cube = new THREE.Object3D();
cube.add(cylinder);
cylinder.rotation.x = -Math.PI / 2;
scene.add(cube);
scene2.add(cube2);
scene2.add(camera2);
camera.position.z = 2;
camera2.position.z = 2;

const StateMachine = {
  currentMode: "recording",
  modes: {
    idle: {},
    recording: {},
    comparing: {},
  },
};
const stateMachine = Object.create(StateMachine);
function getCurrentMode() {
  return stateMachine.currentMode;
}

const gyro = new Gyro();
const masterReel = new Reel();
let currentFrame = 0;

const compass = new THREE.Object3D();
compass.position.y = -9.8;
cube.lookAt(compass.position);

addEventListener("click", (event) => {
  console.log("checking permission");
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    console.log("requesting permission");
    DeviceMotionEvent.requestPermission().then((response) => {
      if (response == "granted") {
        console.log("permission granted");
        startMotion();
      }
    });
  } else {
    console.log("no permission needed");
    startMotion();
  }
});

function startMotion() {
  console.log("starting motion");
  window.addEventListener("devicemotion", (event) => {
    compass.position.x = event.accelerationIncludingGravity.x;
    compass.position.y = event.accelerationIncludingGravity.y;
    compass.position.z = event.accelerationIncludingGravity.z;
    cube.lookAt(compass.position);
    gyro.x = cube.rotation.x * (180 / Math.PI);
    gyro.y = cube.rotation.y * (180 / Math.PI);
    gyro.z = cube.rotation.z * (180 / Math.PI);
  });
}
function vectorToEulerAngles(x, y, z) {
  let pitch = Math.asin(-y);
  let yaw = Math.atan2(x, z);
  let roll = Math.atan2(y, x);
  return { pitch, yaw, roll };
}

function animate() {
  switch (stateMachine.currentMode) {
    case "idle":
      break;
    case "recording":
      if (gyro.isMoving()) {
        masterReel.addFrame(currentFrame, gyro.readArray());
        console.log(masterReel.readFrame(currentFrame));
        currentFrame++;
      }
      break;
    case "comparing":
      if (gyro.isMoving()) {
        let gyroFrame = gyro.readArray();
        let difference = masterReel.compareGyroFrame(
          gyroFrame,
          getToleranceLevel()
        );
        changeScore(difference);
        currentFrame++;
      }
      break;
  }
  renderer.render(scene, camera);
  renderer2.render(scene2, camera2);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

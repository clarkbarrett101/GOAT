import { Gyro } from "./gyro.js";
import { Reel } from "./reel.js";
import {
  changeScore,
  getToleranceLevel,
  setModeToCompare,
  setModeToRecord,
  increaseToleranceLevel,
  decreaseToleranceLevel,
} from "./gizmos.js";
import * as THREE from "https://unpkg.com/three/build/three.module.js";
// UpdateLoop() is the main loop of the program. It checks the current mode and runs the appropriate code. The loop repeats 10 times per second.

document.getElementById("plusTolerance").addEventListener("click", () => {
  increaseToleranceLevel();
  document.getElementById("frame").innerHTML =
    Math.round(10 * getToleranceLevel()) / 10;
});
document.getElementById("minusTolerance").addEventListener("click", () => {
  decreaseToleranceLevel();
  document.getElementById("frame").innerHTML =
    Math.round(10 * getToleranceLevel()) / 10;
});

const recordButton = document.getElementById("recordButton");
const compareButton = document.getElementById("compareButton");
recordButton.addEventListener("click", () => {
  setModeToRecord(stateMachine);
});
compareButton.addEventListener("click", () => {
  setModeToCompare(stateMachine);
});

const scene = new THREE.Scene();
const scene2 = new THREE.Scene();
scene.background = new THREE.Color(0xffeeee);
scene2.background = new THREE.Color(0xeeeeff);
scene.fog = new THREE.Fog(0xffeeee, 0, 3);
scene2.fog = new THREE.Fog(0xeeeeff, 0, 3);
scene.background = new THREE.Color(0xffeeee);
scene2.background = new THREE.Color(0xeeeeff);
scene.fog = new THREE.Fog(0xffeeee, 0, 3);
scene2.fog = new THREE.Fog(0xeeeeff, 0, 3);
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
const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cylinder = new THREE.Mesh(geometry, material);
const cylinder2 = new THREE.Mesh(geometry, material2);
const cube2 = new THREE.Object3D();
const cube = new THREE.Object3D();
cube.add(cylinder);
cube2.add(cylinder2);
cube2.add(cylinder2);
cylinder.rotation.x = -Math.PI / 2;
cylinder2.rotation.x = -Math.PI / 2;
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
stateMachine.currentMode = "idle";

const gyro = new Gyro();
const masterReel = new Reel();
let currentFrame = 0;

const compass = new THREE.Object3D();
scene.add(compass);
const compass2 = new THREE.Object3D();
scene2.add(compass2);
compass.position.y = -9.8;
cube.lookAt(compass.position);

let motionSet = false;

addEventListener("click", (event) => {
  if (!motionSet) {
    motionSet = true;
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
    if (!motionSet) {
      motionSet = true;
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
    }
  }
});

function startMotion() {
  console.log("starting motion");
  window.addEventListener("devicemotion", (event) => {
    compass.position.x = event.accelerationIncludingGravity.x / 3;
    compass.position.y = event.accelerationIncludingGravity.y / 3;
    compass.position.z = event.accelerationIncludingGravity.z / 3;
    cube.lookAt(compass.position);
    gyro.x = compass.position.x;
    gyro.y = compass.position.y;
    gyro.z = compass.position.z;
  });
}

let frameDisplay = document.getElementById("frame");
let maxFrame = 0;
function animate() {
  compass.position.x = gyro.x;
  compass.position.y = gyro.y;
  compass.position.z = gyro.z;
  cube.lookAt(compass.position);
  switch (stateMachine.currentMode) {
    case "idle":
      currentFrame = 0;
      maxFrame = masterReel.frames.length;
      break;
    case "recording":
      if (gyro.isMoving()) {
        masterReel.addFrame(currentFrame, gyro.readArray());
        currentFrame++;
      }
      compass2.position.clone(compass.position);
      cube2.lookAt(compass2.position);
      break;
    case "comparing":
      if (gyro.isMoving()) {
        let gyroFrame = gyro.readArray();
        let reelFrame = masterReel.readFrame(currentFrame);
        compass2.position.x = reelFrame[0];
        compass2.position.y = reelFrame[1];
        compass2.position.z = reelFrame[2];
        cube2.lookAt(compass2.position);
        changeScore(
          masterReel.compareGyroFrame(
            gyroFrame,
            currentFrame,
            getToleranceLevel()
          )
        );
        currentFrame++;
      }
      if (currentFrame >= maxFrame) {
        compareButton.click();
      }
      break;
  }
  renderer.render(scene, camera);
  renderer2.render(scene2, camera2);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

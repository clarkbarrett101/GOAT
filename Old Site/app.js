import { Gyro } from "./gyro.js";
import { Reel } from "./reel.js";
import {
  changeScore,
  getToleranceLevel,
  setModeToCompare,
  setModeToRecord,
  increaseToleranceLevel,
  decreaseToleranceLevel,
  scoreToLetterGrade,
} from "./gizmos.js";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const loader = new GLTFLoader();
const gyro = new Gyro();
const masterReel = new Reel();
const recordButton = document.getElementById("recordButton");
const compareButton = document.getElementById("compareButton");
const calibrateButton = document.getElementById("calibrateButton");
const pairButton = document.getElementById("pairButton");
recordButton.addEventListener("click", () => {
  setModeToRecord(stateMachine);
});
compareButton.addEventListener("click", () => {
  setModeToCompare(stateMachine);
});
calibrateButton.addEventListener("click", () => {
  gyro.calibrate();
});
pairButton.addEventListener("click", () => {
  gyro.connectBLE();
});

const scene = new THREE.Scene();
const scene2 = new THREE.Scene();
scene.background = new THREE.Color(0xffeeee);
scene2.background = new THREE.Color(0xeeeeff);
scene.fog = new THREE.Fog(0xffeeee, 0, 7);
scene2.fog = new THREE.Fog(0xeeeeff, 0, 7);
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
scene2.add(camera2);
camera.position.z = 2;
camera2.position.z = 2;
let skull1 = new THREE.Scene();
let skull2 = new THREE.Scene();
loader.load("./assets/GoatSkull.glb", function (skull) {
  skull.scene.scale.set(0.3, 0.3, 0.3);
  skull.scene.traverse(function (child) {
    if (child.isMesh) {
      child.depthWrite = false;
    }
  });
  skull1.add(skull.scene);
  skull2.add(skull.scene.clone());
  scene.add(skull1);
  scene2.add(skull2);
});
let compass = new THREE.Object3D();
let compassBuffer = new THREE.Object3D();
let compass2 = new THREE.Object3D();
let compassBuffer2 = new THREE.Object3D();
scene.add(compass);
scene2.add(compass2);
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
let currentFrame = 0;

let frameDisplay = document.getElementById("frame");
let maxFrame = 0;
let gyroBuffer = [0, 0, 0];
function animate() {
  compass.position.x = gyro.readArray()[0] + skull1.position.x;
  compass.position.y = gyro.readArray()[1] + skull1.position.y;
  compass.position.z = gyro.readArray()[2] + skull1.position.z;
  skull1.lookAt(compass.position);
  switch (stateMachine.currentMode) {
    case "idle":
      currentFrame = 0;
      masterReel.reset();
      maxFrame = masterReel.frames.length;
      frameDisplay.innerHTML = currentFrame + "/" + maxFrame;
      break;
    case "recording":
      compass2.position.x = gyro.readArray()[0] + skull2.position.x;
      compass2.position.y = gyro.readArray()[1] + skull2.position.y;
      compass2.position.z = gyro.readArray()[2] + skull2.position.z;
      skull2.lookAt(compass2.position);
      if (masterReel.addFrame(gyro.readArray())) {
        setModeToCompare(stateMachine);
        currentFrame = 0;
      } else {
        currentFrame++;
      }
      maxFrame = masterReel.frames.length;
      frameDisplay.innerHTML = currentFrame + "\n/" + maxFrame;
      break;
    case "comparing":
      let gyroFrame = gyro.readArray();
      let newFrame = masterReel.getFrame(currentFrame);
      compass2.position.x = newFrame[0] + skull2.position.x;
      compass2.position.y = newFrame[1] + skull2.position.y;
      compass2.position.z = newFrame[2] + skull2.position.z;
      skull2.lookAt(compass2.position);
      masterReel.compareGyroFrame(currentFrame, gyroFrame);
      scoreToLetterGrade(masterReel.getScore() / 100);
      currentFrame++;
      frameDisplay.innerHTML = currentFrame + "\n/" + maxFrame;
      if (currentFrame >= maxFrame) {
        currentFrame = 0;
      }
      break;
  }
  if (gyro.isConnected()) {
    pairButton.className =
      "m-3 rounded-full border-8 border-white w-fit text-white bg-blue-900 font-extrabold flex flex-row h-fit";
  }
  renderer.render(scene, camera);
  renderer2.render(scene2, camera2);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

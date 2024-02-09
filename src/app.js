import { Gyro } from "./gyro.js";
import { Reel } from "./reel.js";
import {} from "./gizmos.js";
import * as THREE from "https://unpkg.com/three/build/three.module.js";
// UpdateLoop() is the main loop of the program. It checks the current mode and runs the appropriate code. The loop repeats 10 times per second.

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(0xffffff, 0, 3);
const camera = new THREE.PerspectiveCamera(75, 600 / 600, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(600, 600);
const compareView = document.getElementById("compareView");
compareView.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(geometry, material);
cube.rotation.y = 0.5;
cube.rotation.x = 0.5;
scene.add(cube);
camera.position.z = 2;

const liveView = document.getElementById("liveView");
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
    gyro.x = event.rotationRate.beta;
    gyro.y = event.rotationRate.gamma;
    gyro.z = event.rotationRate.alpha;
  });
}

function animate() {
  cube.rotation.x = gyro.x;
  cube.rotation.y = gyro.y;
  cube.rotation.z = gyro.z;
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
  liveView.innerText =
    "x: " +
    Math.round(gyro.x) +
    " y: " +
    Math.round(gyro.y) +
    " z: " +
    Math.round(gyro.z);
  if (gyro.isMoving()) {
    liveView.className = "bg-green-400";
  } else {
    liveView.className = "bg-red-500";
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let deltaTime = 0;

requestAnimationFrame(animate);

/*
module.exports = {getCurrentMode}


let masterReel = new Reel();
let currentFrame = 0;
function UpdateLoop(){
  console.log(stateMachine.currentMode);
  switch(stateMachine.currentMode){
    case "idle":
      break;
    case "recording":
        if(gyro.isMoving()){
          masterReel.addFrame(currentFrame,gyro.readArray());
        }
      break;
    case "comparing":
        if(gyro.isMoving()){
          let gyroFrame = gyro.readArray();
          let difference = compareGyroFrame(reelFrame,gyroFrame,Gizmos.ToleranceLevel);
          changeScore(difference);
          currentFrame++;
        }
      break;
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let deltaTime = 0;

while(true){
    let startTime = Date.now();
    UpdateLoop();
    gyro.testRotation();
    let endTime = Date.now();
    deltaTime = endTime - startTime;
    if(deltaTime < 100){
        sleep(100 - deltaTime).then(() => {}
        );
    }
}
*/

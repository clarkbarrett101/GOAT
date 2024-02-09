import { Gyro } from "./gyro.js";
import { Reel } from "./reel.js";
import {} from "./gizmos.js";
import * as THREE from "../node_modules/three";
import { GTLFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// UpdateLoop() is the main loop of the program. It checks the current mode and runs the appropriate code. The loop repeats 10 times per second.

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
const liveView = document.getElementById("liveView");
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
    gyro.x = (event.accelerationIncludingGravity.x + 10) * 9;
    gyro.y = (event.accelerationIncludingGravity.y + 10) * 9;
    gyro.z = (event.accelerationIncludingGravity.z + 10) * 9;
  });
}

function UpdateLoop() {
  gyro.testRotation(0.001);
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
  requestAnimationFrame(UpdateLoop);
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let deltaTime = 0;

requestAnimationFrame(UpdateLoop);

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

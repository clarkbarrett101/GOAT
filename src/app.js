const Gyro = require("./gyro.js");
const Reel = require("./reel.js");
const Gizmos = require("./gizmos.js");

//UpdateLoop() is the main loop of the program. It checks the current mode and runs the appropriate code. The loop repeats 10 times per second.
const StateMachine = {
    currentMode: "idle",
    modes: {
        idle: {},
        recording: {},
        comparing: {}
    },
}
const stateMachine = Object.create(StateMachine);
function getCurrentMode(){
  return stateMachine.currentMode
}
module.exports = {getCurrentMode}
/*
const gyro = new Gyro();
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

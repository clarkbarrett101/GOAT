//const Gyro = require("./gyro.js");
//const Reel = require("./reel.js");
//const Gizmos = require("./gizmos.js");
// UpdateLoop() is the main loop of the program. It checks the current mode and runs the appropriate code. The loop repeats 10 times per second.
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
class Gyro {
  constructor() {
      this.testModifier = 0.0;
      this.sensitivity = 0.1;
      this.x = 0.0;
      this.y = 0.0;
      this.z = 0.0;
      this.lastRotation = [0.0,0.0,0.0];
      this.readArray = function(){
          return [this.x, this.y, this.z];
      }
      this.isMoving = function(){
      //TODO: isMoving function
      // this function returns true if the magnatutide of the gyro's rotations is greater than the sensitivity value

      }
      this.testRotation = function(x){
          this.testModifier += x;
          this.x = Math.sin(this.testModifier);
          this.y = Math.sin(this.testModifier*2);
          this.z = Math.sin(this.testModifier/3);
      }
  }
}
const gyro = new Gyro();
const liveView = document.getElementById("liveView");
addEventListener("click", (event) => {
  console.log("checking permission");
  if (typeof DeviceMotionEvent.requestPermission === 'function') {
  console.log("requesting permission");
    DeviceMotionEvent.requestPermission().then(response => {
      if (response == 'granted') {
        console.log("permission granted");
        startMotion();
      }
    })
  }else{
    console.log("no permission needed");
    startMotion();
  }
});

function startMotion(){
  console.log("starting motion");
  window.addEventListener("devicemotion", (event) => {
    gyro.x = event.accelerationIncludingGravity.x;
    gyro.y = event.accelerationIncludingGravity.y;
    gyro.z = event.accelerationIncludingGravity.z;    
    liveView.innerText = 'x: '+gyro.x +' y: '+gyro.y+'z: '+gyro.z;
  })
}
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

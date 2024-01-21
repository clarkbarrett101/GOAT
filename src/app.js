const gyro = new Gyro();
let masterReel;
let recordedReels = [];

const stateMachine = {
    currentMode: "idle",
    modes: {
        idle: {},
        recording: {},
        comparing: {}
    },
}

function UpdateLoop(){
  switch(stateMachine.currentMode){
    case "idle":

      break;
    case "recording":

      break;
    case "comparing":

      break;
  }  
}

while(true){
    UpdateLoop();
}
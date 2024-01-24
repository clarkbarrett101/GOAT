const gyro = new Gyro();
let masterReel;
let currentFrame = 0;

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
        if(gyro.isMoving()){
          masterReel.addFrame(currentFrame,gyro.readArray());
        }
      break;
    case "comparing":
        if(gyro.isMoving()){
          gyroFrame = gyro.readArray();
          reelFrame = masterReel.readFrame(currentFrame);
          let difference = compareGyroFrame(reelFrame,gyroFrame,toleranceLevel);
          changeScore(difference);
          currentFrame++;
        }
      break;
  }  
}

while(true){
    UpdateLoop();
}
//This class should be able to add and compare frames
//We need to decide how to compare the frames and then how that should affect the score
//We want to avoid the score going negative and we want to avoid the score going above 100%

class Reel {
  constructor() {
    this.reel = [];
    this.tolerance = 1;
    this.comulative_score = score;
    this.score = 100;
    this.error = 1;
    this.letters = ["S", "A", "B", "C", "D", "F"];
    this.minScore = 0;
    this.maxScore = 100;
    this.checkSensitivity = 0.05;
    this.calibrationReadings = [];
    this.calibrationTimer = 30;
    this.offset = [0.0, 0.0, 0.0]; 


    addFrame =  (frame) => {
      if (this.mode === "calibrate") {
        this.calibrate(frame);
      } else {
        this.frames.push(frame);
        if (this.checkForRepeat(frame)) {
          console.log("Switching to compare mode");
        }
      }
    }
  this.calibrate = (frame) =>{
    this.calibrateTimer--;

    if (calibrateTimer > 0) {

      this.calibrationReadings.push(frame);
      return false; 

    }else{
      const sums = this.calibrationReadings.reduce((acc, val) => [acc[0] + val[0], acc[1] + val[1], acc[2] + val[2]], [0, 0, 0]);
      this.offset = sums.map(sum => sum / this.calibrationReadings.length);


      //reset timer and clear the calibration
      this.calibrationReadings = [];
      this.calibrateTimer = 30;
      this.mode = "normal";

      console.log("Calibration Complete. Offset:", this.offset);
      return true;
      }
  
    }

    
  



    this.getFrame = (index) => {
    return this.frames[index];
  }


    this.calculateDifference = (index) => {

      return 0;
    };


    this.compareFrames = (frameIdx, gyroFrame) => {
      let result = 0;

    let difference = this.calculateDifference(this.reel[frameIdx], gyroFrame);
    let adjustedDifference = (difference + 1) * this.tolerance; 
      this.adjustScore(adjustedDifference);
    };

    this.adjustScore = (value) => {
      this.score = Math.max(this.minScore, Math.min(this.maxScore, this.cumulativeScore + adjustedDifference * 100));
      
    }

    this.getScore = () => {
      return this.score;
    };


    this.getLetter = (i) => {
      if (score  => 90 && score < 100){
        i = 0;
      } else if (score >= 70 && score < 89) {
        i = 1;
      }
      else if (score >= 50 && score < 69){
        i = 2;
      }
      else if (score >= 30 && score < 49){
        i = 3;
      }
      else if (score >= 20 && score < 29){
        i = 4;
      }
      else if (score >= 0 && score < 9){
        i = 5;
      }
      return this.letters[i];
    };

    

  checkForRepeat(currentFrame) = () => {
      if (this.frames.length < 2) {
          return false;
      }

      let isRepeat = false;
      let firstFrame = this.frames[0];
      let diff = 0;

      for (let i = 0; i < 3; i++) {
          diff += Math.abs(currentFrame[i] - firstFrame[i]);
      }

      if (diff <= this.checkSensitivity) {
          isRepeat = true;
      }

      return isRepeat;
  }
}
}

 import React, { useState } from 'react';

class Reel extends React.Component({ appMode, setAppMode }){
  constructor() {
    const modes = ["noRecording", "idle", "recording", "comparing", "calibrating"];
    this.mode = appMode;
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

    this.appLoop = (gyro) => { //change modes
      switch (this.mode) {
        case "noRecording":

          break;
        case "recording":
          this.getFrameRate(gyro);
        
          break;
        case "comparing":
          this.compareFrames(gyro);
          

          break;
        case "calibrating":
          this.calibrateFrames(gyro);

          break;
        default:
          break;
      }
    };

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

  this.calibrate = (frame) =>{ //Calibrate
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
export default Reel;
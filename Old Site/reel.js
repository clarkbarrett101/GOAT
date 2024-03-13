// A Reel is a collection of frames, each frame is a Array[3] of gyro rotation data

class Reel {
  constructor() {
    this.frames = [];
    this.tolerance = 1;
    this.comulative_score = score;
    this.score = 100;
    this.error = 1;
    this.letters = ["S", "A", "B", "C", "D", "F"];
    this.minScore = 0;
    this.maxScore = 100;
    this.checkSensitivity = 0.5;
    this.offset = [0.0, 0.0, 0.0];

    this.addFrame = (frame) => {
      this.frames.push(frame);
      return this.checkForRepeat(frame);
    };

    this.getFrame = (index) => {
      return this.frames[index];
    };
    this.reset = () => {
      this.frames = [];
      this.score = 100;
    };
    this.calculateDifference = (index, gyroFrame) => {
      let frame = this.frames[index];
      let magnitude =
        (frame[0] - gyroFrame[0]) ** 2 +
        (frame[1] - gyroFrame[1]) ** 2 +
        (frame[2] - gyroFrame[2]) ** 2;
      return Math.sqrt(magnitude);
    };

    this.compareGyroFrame = (frameIdx, gyroFrame) => {
      let difference = this.calculateDifference(frameIdx, gyroFrame);
      let adjustedDifference = difference * this.tolerance;
      this.score = Math.max(
        this.minScore,
        Math.min(this.maxScore, this.score + adjustedDifference * 100)
      );
    };

    this.getScore = () => {
      return this.score;
    };

    this.getLetter = () => {
      if (this.score >= 90) {
        i = 0;
      } else if (this.score >= 70) {
        i = 1;
      } else if (this.score >= 50) {
        i = 2;
      } else if (this.score >= 30) {
        i = 3;
      } else if (this.score >= 20) {
        i = 4;
      } else if (this.score >= 0) {
        i = 5;
      }
      return this.letters[i];
    };

    this.checkForRepeat = (currentFrame) => {
      if (this.frames.length < 100) {
        return false;
      }

      let isRepeat = false;
      let firstFrame = this.frames[0];
      let diff = 0;

      for (let i = 0; i < 3; i++) {
        diff += Math.abs(currentFrame[i] - firstFrame[i]);
      }
      console.log(diff);

      if (diff <= this.checkSensitivity) {
        isRepeat = true;
      }

      return isRepeat;
    };
  }
}
export { Reel };

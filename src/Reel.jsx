//This class should be able to add and compare frames
//We need to decide how to compare the frames and then how that should affect the score
//We want to avoid the score going negative and we want to avoid the score going above 100%

class Reel {
  constructor() {
    this.reel = [];
    this.tolerance = 1;
    this.score = 100;
    this.letters = ["S", "A", "B", "C", "D", "F"];
    this.addFrame = (frameIdx, frame) => {
      reel[frameIdx] = frame;
    };
    this.getFrame = (index) => {
      return this.reel[index];
    };
    this.compareFrames = (frameIdx, gyroFrame) => {
      let result = 0;

      this.adjustScore(result);
    };
    this.adjustScore = (value) => {};
    this.getScore = () => {
      return this.score;
    };
    this.getLetter = () => {
      return this.letters[0];
    };
  }
}
export default Reel;

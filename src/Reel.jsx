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
    this.addFrame = (frameIdx, frame) => {
      reel[frameIdx] = frame;
    };
    this.getFrame = (index) => {
      return this.reel[index];
    };

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
  }
}
export default Reel;

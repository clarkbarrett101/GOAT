// A Reel is a collection of frames, each frame is a Array[3] of gyro rotation data

class Reel {
  constructor() {
    this.frames = [];
    // this function returns a frame from the reel at the specified frame number
    this.readFrame = function (frameNumber) {
      return this.frames[frameNumber];
    };

    // this function adds a frame to the reel at the specified frame number
    this.addFrame = function (frameNumber, frame) {
      this.frames[frameNumber] = frame;
    };

    // this function compares two frames and returns a number representing the difference between them, adjusted by the tolerance level
    this.compareGyroFrame = function (gyroFrame, frameNumber, toleranceLevel) {
      let frame = this.readFrame(frameNumber);
      let difference = [
        gyroFrame[0] - frame[0],
        gyroFrame[1] - frame[1],
        gyroFrame[2] - frame[2],
      ];
      let magnitude = Math.sqrt(
        difference[0] * difference[0] +
          difference[1] * difference[1] +
          difference[2] * difference[2]
      );
      magnitude = magnitude / 6;
      return toleranceLevel - magnitude;
    };
  }
}
export { Reel };

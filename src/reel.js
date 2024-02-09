// A Reel is a collection of frames, each frame is a Array[3] of gyro rotation data

class Reel {
  constructor() {
    this.frames = [];
    //TODO: Read function
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
      // Calculate the dot product of the two vectors
      const dotProduct =
        gyroFrame[0] * this.frames[frameNumber][0] +
        gyroFrame[1] * this.frames[frameNumber][1] +
        gyroFrame[2] * this.frames[frameNumber][2];

      // Calculate the magnitude (length) of each vector
      const magnitude1 = Math.sqrt(
        gyroFrame[0] ** 2 + gyroFrame[1] ** 2 + gyroFrame[2] ** 2
      );
      const magnitude2 = Math.sqrt(
        this.frames[frameNumber][0] ** 2 +
          this.frames[frameNumber][1] ** 2 +
          this.frames[frameNumber][2] ** 2
      );

      // Calculate the cosine of the angle between the vectors
      const cosAngle = dotProduct / (magnitude1 * magnitude2);

      // Calculate the angle in radians using the arccosine function
      const angleRadians = Math.acos(cosAngle);

      // Convert the angle to degrees
      const angleDegrees = (angleRadians * 180) / Math.PI;

      return angleDegrees / toleranceLevel;
    };
  }
}
export { Reel };

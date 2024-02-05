
// A Reel is a collection of frames, each frame is a Array[3] of gyro rotation data 

class Reel {
    constructor() {
        this.frames = [];
        //TODO: Read function
        class Reel {
            constructor() {
                this.frames = [];
            }
            // this function returns a frame from the reel at the specified frame number
            readFrame(frameNumber) {
                return this.frames[frameNumber];
            }

            // this function adds a frame to the reel at the specified frame number
            addFrame(frameNumber, frame) {
                this.frames[frameNumber] = frame;
            }

            // this function compares two frames and returns a number representing the difference between them, adjusted by the tolerance level
            compareGyroFrame(gyroFrame, frameNumber, toleranceLevel) {
                let difference = Math.abs(this.frames[frameNumber] - gyroFrame);
                return difference <= toleranceLevel;
            }
        }
        //TODO: Write function
        this.addFrame = function(frameNumber,frame){
        // this function adds a frame to the reel at the specified frame number
        
        }
        //TODO: Compare function
        this.compareGyroFrame = function(gyroFrame, frameNumber, toleranceLevel){
        // this fuction compares two frames and returns a number representing the difference between them, adjusted by the tolerance level
    
        }
    }
}
module.exports = Reel;
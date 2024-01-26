export {Reel};

// A Reel is a collection of frames, each frame is a Array[3] of gyro rotation data 

class Reel {
    constructor() {
        this.frames = [];
        //TODO: Read function
        this.readFrame = function(frameNumber){
        // this function returns a frame from the reel at the specified frame number
            
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
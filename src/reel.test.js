const Reel = require("./reel.js")

test("FrameTest", () => {
    let reel = new Reel();
    frameIdx = 0;
    let frame = [0,0,0];
    reel.addFrame(frameIdx,frame);
    expect(reel.readFrame(frameIdx)).toBe(frame);
    frameIdx = 5;
    let newframe = [1,1,1];
    reel.addFrame(frameIdx,newframe);
    expect(reel.readFrame(frameIdx)).toBe(newframe);
    expect(reel.readFrame(0)).toBe(frame);
});
test("CompareTest", () => {
    let gyroFrame = [1,1,2];
    let reelFrame = [1,1,1];
    let frameNumber = 0;
    let toleranceLevel = 0;
    let reel = new Reel();
    reel.addFrame(frameNumber,reelFrame);
    expect(reel.compareGyroFrame(gyroFrame,frameNumber,toleranceLevel)).toBe(1);
    toleranceLevel = 1;
    expect(reel.compareGyroFrame(gyroFrame,frameNumber,toleranceLevel)).toBe(0);
    frameNumber = 5;
    reelFrame = [2,2,2];
    reel.addFrame(frameNumber,reelFrame);
    expect(reel.compareGyroFrame(gyroFrame,frameNumber,toleranceLevel)).toBe(-1);
    toleranceLevel = 2;
    expect(reel.compareGyroFrame(gyroFrame,frameNumber,toleranceLevel)).toBe(0);
});
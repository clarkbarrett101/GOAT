class Driver {
  modes = ["noRecording", "idle", "recording", "comparing"];
  constructor() {
    if (Driver.instance) {
      return Driver.instance;
    }
    this.reel = new Reel();
    this.gyro = new Gyro();
    this.mode = modes["noRecording"];
    this.toleranceLevel = 0.5;
    this.score = 1;
    this.grade = "S";
    this.currentFrame = 0;
    Driver.instance = this;
  }
}

class Gyro {
    constructor() {
        this.testModifier = 0;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.readArray = function(){
            this.testModifier += 0.1;
            this.x = Math.sin(this.testModifier);
            this.y = Math.sin(this.testModifier*2);
            this.z = Math.sin(this.testModifier/3);
            return [this.x, this.y, this.z];
        }
        this.isMoving = function(){
            
        }
    }
}

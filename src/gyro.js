<<<<<<< HEAD


//The gyro class contains the 3 Axis rotation data of the gyro.  For testing purposes the values are placeholders generated by a sine wave

class Gyro {
    constructor() {
        this.testModifier = 0.0;
        this.sensitivity = 0.1;
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        this.lastRotation = [0.0,0.0,0.0];
        this.readArray = function(){
            return [this.x, this.y, this.z];
        }
        this.isMoving = function(){
        //TODO: isMoving function
        // this function returns true if the magnatutide of the gyro's rotations is greater than the sensitivity value
            
        }
        this.testRotation = function(x){
            this.testModifier += x;
            this.x = Math.sin(this.testModifier);
            this.y = Math.sin(this.testModifier*2);
            this.z = Math.sin(this.testModifier/3);
        }
    }
}
module.exports = Gyro;
=======
//The gyro class contains the 3 Axis rotation data of the gyro.  For testing purposes the values are placeholders generated by a sine wave

class Gyro {
  constructor() {
    this.testModifier = 0.0;
    this.sensitivity = 0.1;
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
    this.lastRotation = [0.0, 0.0, 0.0];
    this.readArray = function () {
      return [this.x, this.y, this.z];
    };

    this.isMoving = function () {
      //TODO: isMoving function
      // this function returns true if the magnatutide of the gyro's rotations is greater than the sensitivity value
      // Function to check if the magnitude of gyro rotations is greater than sensitivity

      function isRotationGreaterThanSensitivity(
        gyroX,
        gyroY,
        gyroZ,
        sensitivity
      ) {
        // Calculate the magnitude of gyro rotations
        const magnitude = Math.sqrt(
          gyroX * gyroX + gyroY * gyroY + gyroZ * gyroZ
        );
        // Check if the magnitude is greater than the sensitivity threshold
        return magnitude > sensitivity;
      }

      // Sensitivity threshold
      const sensitivity = 4.0;

      // Check if the magnitude of gyro rotations is greater than sensitivity
      const result = isRotationGreaterThanSensitivity(
        this.x,
        this.y,
        this.z,
        this.sensitivity
      );

      // Output the result
      if (result) {
        console.log("Gyro rotations magnitude is greater than sensitivity");
      } else {
        console.log("Gyro rotations magnitude is not greater than sensitivity");
      }
    };
    this.testRotation = function (x) {
      this.testModifier += x;
      this.x = Math.sin(this.testModifier);
      this.y = Math.sin(this.testModifier * 2);
      this.z = Math.sin(this.testModifier / 3);
    };
  }
}
module.exports = Gyro;
>>>>>>> 143ce35d056abef7c95d5ff5905a23ca82de4400

class Gyro {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        
        this.isMoving = () => {
            return false;
        }
    }
    
    update(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
export default Gyro;
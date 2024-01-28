const Gyro = require("./gyro.js");


test('Gyro rotation',() =>{
        const gyro = new Gyro();
        gyro.testRotation(1);
        expect(gyro.readArray().toString()).toBe("0.8414709848078965,0.9092974268256817,0.3271946967961522")
    })

    

test("Gyro isMoving", () => {
    let gyro = new Gyro();
    gyro.testRotation(0);
    expect(gyro.isMoving()).toBe(false);
    gyro.testRotation(0.5);
    expect(gyro.isMoving()).toBe(true);
    gyro.testRotation(0);
    expect(gyro.isMoving()).toBe(false);
    gyro.testRotation(0.01);
    expect(gyro.isMoving()).toBe(false);
    gyro.testRotation(0.5);
    expect(gyro.isMoving()).toBe(true);
})
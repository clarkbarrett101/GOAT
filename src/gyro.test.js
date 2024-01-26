import { Gyro } from "./gyro";

TextDecoderStream("Gyro class tests", () => {
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
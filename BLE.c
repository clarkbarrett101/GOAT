#include <ArduinoBLE.h>
#include <LSM6DS3.h>
#include <Wire.h>
#define BLE_BUFFER_SIZES 10

#define BLE_DEVICE_NAME "GOAT Sensor"

#define BLE_LOCAL_NAME "GOAT Sensor"


BLEService BLESensors("590d65c7-3a0a-4023-a05a-6aaf2f22441c");

BLECharacteristic gyroscopeBLEX("0001", BLERead | BLENotify | BLEBroadcast, BLE_BUFFER_SIZES);
BLECharacteristic gyroscopeBLEY("0002", BLERead | BLENotify | BLEBroadcast, BLE_BUFFER_SIZES);
BLECharacteristic gyroscopeBLEZ("0003", BLERead | BLENotify | BLEBroadcast, BLE_BUFFER_SIZES);
BLECharacteristic accelBLEX("0004", BLERead | BLENotify | BLEBroadcast, BLE_BUFFER_SIZES);
BLECharacteristic accelBLEY("0005", BLERead | BLENotify | BLEBroadcast, BLE_BUFFER_SIZES);
BLECharacteristic accelBLEZ("0006", BLERead | BLENotify | BLEBroadcast, BLE_BUFFER_SIZES);

LSM6DS3 myIMU(I2C_MODE, 0x6A);

char BLEBuffer[BLE_BUFFER_SIZES];


void setup() {
//  Serial.begin(9600);
  pinMode(LED_BUILTIN, OUTPUT);
 // while (!Serial);

  if (!BLE.begin()) {
    while (1)
      ;
  } else {
    BLE.setDeviceName(BLE_DEVICE_NAME);
    BLE.setLocalName(BLE_LOCAL_NAME);
    BLE.setAdvertisedService(BLESensors);
    BLESensors.addCharacteristic(gyroscopeBLEX);
    BLESensors.addCharacteristic(gyroscopeBLEY);
    BLESensors.addCharacteristic(gyroscopeBLEZ);
    BLESensors.addCharacteristic(accelBLEX);
    BLESensors.addCharacteristic(accelBLEY);
    BLESensors.addCharacteristic(accelBLEZ);
    BLE.addService(BLESensors);
    BLE.advertise();
  }
}


void loop() {
  BLEDevice central = BLE.central();
  digitalWrite(LED_BUILTIN, HIGH);  
  delay(1000);                      
  digitalWrite(LED_BUILTIN, LOW);   
  delay(1000); 
  if (central) {
    int writeLength;
    while (central.connected()) {
      digitalWrite(LED_BUILTIN, LOW);  
      writeLength = sprintf(BLEBuffer, "%f", myIMU.readFloatGyroX());
      gyroscopeBLEX.writeValue((void*)BLEBuffer, writeLength);
      writeLength = sprintf(BLEBuffer, "%f", myIMU.readFloatGyroY());
      gyroscopeBLEY.writeValue((void*)BLEBuffer, writeLength);
      writeLength = sprintf(BLEBuffer, "%f", myIMU.readFloatGyroZ());
      gyroscopeBLEZ.writeValue((void*)BLEBuffer, writeLength);
      writeLength = sprintf(BLEBuffer, "%f", myIMU.readFloatAccelX());
      accelBLEX.writeValue((void*)BLEBuffer, writeLength);
      writeLength = sprintf(BLEBuffer, "%f", myIMU.readFloatAccelY());
      accelBLEY.writeValue((void*)BLEBuffer, writeLength);
      writeLength = sprintf(BLEBuffer, "%f", myIMU.readFloatAccelZ());
      accelBLEZ.writeValue((void*)BLEBuffer, writeLength);
    }
  }
}
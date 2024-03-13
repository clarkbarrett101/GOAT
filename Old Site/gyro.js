class Gyro {
  constructor() {
    let service = "590d65c7-3a0a-4023-a05a-6aaf2f22441c";
    let characteristics = [0x0004, 0x0005, 0x0006];
    let connected = false;
    let gyro = [0.0, 0.0, 0.0];
    let currentRotation = [0.0, 0.0, 0.0];
    let gOffset = [0.0, 0.0, 0.0];

    this.readArray = () => {
      let Array = [gyro[0], gyro[1] + gOffset[1], gyro[2] + gOffset[2]];
      return Array;
    };
    this.calibrate = () => {
      console.log(gyro);
      gOffset[0] = -gyro[0];
      gOffset[1] = -gyro[1];
      gOffset[2] = -gyro[2];
    };
    this.isConnected = () => {
      return connected;
    };

    function gyroXChanged(event) {
      var value = event.target.value;
      var str = "";
      for (var i = 0; i < value.byteLength; i++) {
        str += String.fromCharCode(value.getUint8(i));
      }
      gyro[0] = parseFloat(str);
      connected = true;
      currentRotation[0] += gyro[0] + gOffset[0];
    }
    function gyroYChanged(event) {
      var value = event.target.value;
      var str = "";
      for (var i = 0; i < value.byteLength; i++) {
        str += String.fromCharCode(value.getUint8(i));
      }
      gyro[1] = parseFloat(str);
      connected = true;

      currentRotation[1] += gyro[1] + gOffset[1];
    }
    function gyroZChanged(event) {
      var value = event.target.value;
      var str = "";
      for (var i = 0; i < value.byteLength; i++) {
        str += String.fromCharCode(value.getUint8(i));
      }
      gyro[2] = parseFloat(str);
      currentRotation[2] += gyro[2] + gOffset[2];
      connected = true;
    }

    const functions = [gyroXChanged, gyroYChanged, gyroZChanged];
    this.connectBLE = () => {
      try {
        navigator.bluetooth
          .requestDevice({ filters: [{ services: [service] }] })
          .then((device) => device.gatt.connect())
          .then((server) => server.getPrimaryService(service))
          .then((service) => {
            for (let i = 0; i < characteristics.length; i++) {
              service
                .getCharacteristic(characteristics[i])
                .then((characteristic) => {
                  console.log(characteristic);
                  characteristic.startNotifications().then((_) => {
                    characteristic.addEventListener(
                      "characteristicvaluechanged",
                      functions[i]
                    );
                  });
                });
            }
          });
      } catch (e) {
        window.alert("Connection failed. Please try again.");
      }
    };
  }
}
export { Gyro };

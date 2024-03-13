class Gyro {
  constructor() {
    let service = "590d65c7-3a0a-4023-a05a-6aaf2f22441c";
    let characteristics = [0x0001, 0x0002, 0x0003];
    let connected = false;
    let gyro = [0.0, 0.0, 0.0];

    this.readArray = () => {
      return gyro;
    };

    function gyroXChanged(event) {
      var value = event.target.value;
      var str = "";
      for (var i = 0; i < value.byteLength; i++) {
        str += String.fromCharCode(value.getUint8(i));
      }
      gyro[0] = parseFloat(str);
    }
    function gyroYChanged(event) {
      var value = event.target.value;
      var str = "";
      for (var i = 0; i < value.byteLength; i++) {
        str += String.fromCharCode(value.getUint8(i));
      }
      gyro[1] = parseFloat(str);
    }
    function gyroZChanged(event) {
      var value = event.target.value;
      var str = "";
      for (var i = 0; i < value.byteLength; i++) {
        str += String.fromCharCode(value.getUint8(i));
      }
      gyro[2] = parseFloat(str);
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
          })
          .then((connected = true));
      } catch (e) {
        window.alert("Connection failed. Please try again.");
      }
    };
  }
}
export default Gyro;

//const Gyro = require("./gyro.js");
//const Reel = require("./reel.js");
//const Gizmos = require("./gizmos.js");
// UpdateLoop() is the main loop of the program. It checks the current mode and runs the appropriate code. The loop repeats 10 times per second.
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const StateMachine = {
    currentMode: "idle",
    modes: {
        idle: {},
        recording: {},
        comparing: {}
    },
}
const stateMachine = Object.create(StateMachine);
function getCurrentMode(){
  return stateMachine.currentMode
}
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
const gyro = new Gyro();
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
const camera = new THREE.PerspectiveCamera( 75, 400 / 400, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth/2, window.innerWidth/2);
document.getElementById("liveView").appendChild( renderer.domElement );
const clock = new THREE.Clock();
const rotationSpeed = .5;
camera.position.z = 8;
const light = new THREE.DirectionalLight("0xfffff",5); // soft white light
light.position.set(0,5,10);
light.target.position.set(0,0,0);
scene.add( light );
const loader = new GLTFLoader();
let goat = new THREE.Object3D();
loader.load( 'goat.glb', function ( gltf ) {
  goat.add(gltf.scene.children[0]);
  scene.add( goat );
});
goat.rotation.y = Math.PI/4;
goat.rotation.x = Math.PI/8;

window.addEventListener("devicemotion", (event) => {
  gyro.x = event.accelerationIncludingGravity.x;
  gyro.y = event.accelerationIncludingGravity.y;
  gyro.z = event.accelerationIncludingGravity.z;
});
function animate() {
	requestAnimationFrame( animate );
  goat.rotation.y += gyro.x;
  goat.rotation.x += gyro.y;
  goat.rotation.z = gyro.z;
	renderer.render( scene, camera );
}

animate();
/*
module.exports = {getCurrentMode}


let masterReel = new Reel();
let currentFrame = 0;
function UpdateLoop(){
  console.log(stateMachine.currentMode);
  switch(stateMachine.currentMode){
    case "idle":
      break;
    case "recording":
        if(gyro.isMoving()){
          masterReel.addFrame(currentFrame,gyro.readArray());
        }
      break;
    case "comparing":
        if(gyro.isMoving()){
          let gyroFrame = gyro.readArray();
          let difference = compareGyroFrame(reelFrame,gyroFrame,Gizmos.ToleranceLevel);
          changeScore(difference);
          currentFrame++;
        }
      break;
  }
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let deltaTime = 0;

while(true){
    let startTime = Date.now();
    UpdateLoop();
    gyro.testRotation();
    let endTime = Date.now();
    deltaTime = endTime - startTime;
    if(deltaTime < 100){
        sleep(100 - deltaTime).then(() => {}
        );
    }
}
*/

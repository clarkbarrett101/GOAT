let toleranceLevel = 1;
let score = 1;

const recordIcon = document.getElementById("record_icon");
const recordText = document.getElementById("recordButton");
const recordOnImg = "assets/record_active.png";
const recordOnStyle =
  "m-3 rounded-full border-8 border-white w-fit h-full text-white bg-red-700 font-extrabold flex flex-row";
const recordOffImg = "assets/record_inactive.png";
const recordOffStyle =
  "m-3 rounded-full border-8 border-red-900 w-fit h-full text-red-900 bg-white font-extrabold flex flex-row";
const compareIcon = document.getElementById("compare_icon");
const compareText = document.getElementById("compareButton");
const compareOnImg = "assets/compare_active.png";
const compareOnStyle =
  "m-3 rounded-full border-8 border-white w-fit text-white bg-blue-900 font-extrabold flex flex-row h-fit";
const compareOffImg = "assets/compare_inactive.png";
const compareOffStyle =
  "m-3 rounded-full border-8 border-blue-900 w-fit text-blue-900 bg-white font-extrabold flex flex-row h-fit";
let recordingAvailable = false;

function getScore() {
  return score;
}
function getToleranceLevel() {
  return toleranceLevel;
}
//TODO: Tolerance functions
function increaseToleranceLevel() {
  toleranceLevel += 0.1;
}

function decreaseToleranceLevel() {
  toleranceLevel -= 0.1;
  if (toleranceLevel < 0) {
    toleranceLevel = 0;
  }
}
//TODO: Mode functions
function setModeToRecord(stateMachine) {
  if (
    stateMachine.currentMode == "recording" ||
    stateMachine.currentMode == "comparing"
  ) {
    stateMachine.currentMode = "idle";
    recordIcon.src = recordOffImg;
    recordText.className = recordOffStyle;
    compareIcon.src = compareOffImg;
    compareText.className = compareOffStyle;
  } else {
    stateMachine.currentMode = "recording";
    recordIcon.src = recordOnImg;
    recordText.className = recordOnStyle;
    recordingAvailable = true;
  }
  console.log(stateMachine.currentMode);
}

function setModeToCompare(stateMachine) {
  recordIcon.src = recordOffImg;
  recordText.className = recordOffStyle;
  if (stateMachine.currentMode == "comparing") {
    stateMachine.currentMode = "idle";
    compareIcon.src = compareOffImg;
    compareText.className = compareOffStyle;
  } else if (recordingAvailable) {
    stateMachine.currentMode = "comparing";
    compareIcon.src = compareOnImg;
    compareText.className = compareOnStyle;
  }
  console.log(stateMachine.currentMode);
}
//TODO: Score function
function changeScore(change) {
  scoreToLetterGrade(change);
}
function scoreToLetterGrade(score) {
  let letter = "S";
  if (score < 0.5) {
    letter = "F";
  } else if (score < 0.6) {
    letter = "D";
  } else if (score < 0.7) {
    letter = "C";
  } else if (score < 0.8) {
    letter = "B";
  } else if (score < 0.9) {
    letter = "A";
  }
  changeScoreDisplay(letter);
}
function changeScoreDisplay(letter) {
  document.getElementById("score").innerHTML = letter;
}
export {
  getToleranceLevel,
  getScore,
  increaseToleranceLevel,
  decreaseToleranceLevel,
  changeScore,
  scoreToLetterGrade,
  setModeToCompare,
  setModeToRecord,
};

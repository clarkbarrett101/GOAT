let toleranceLevel = 1;
let score = 1;
function getScore() {
  return score;
}
function getToleranceLevel() {
  return toleranceLevel;
}
//TODO: Tolerance functions
function increaseToleranceLevel() {}

function decreaseToleranceLevel() {}
//TODO: Mode functions
function setModeToRecord(stateMachine) {
  if (
    stateMachine.currentMode == "recording" ||
    stateMachine.currentMode == "comparing"
  ) {
    stateMachine.currentMode = "idle";
  } else {
    stateMachine.currentMode = "recording";
  }
  console.log(stateMachine.currentMode);
}

function setModeToCompare(stateMachine) {
  if (
    stateMachine.currentMode == "recording" ||
    stateMachine.currentMode == "comparing"
  ) {
    stateMachine.currentMode = "idle";
  } else {
    stateMachine.currentMode = "comparing";
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

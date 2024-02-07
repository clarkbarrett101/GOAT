
let toleranceLevel = 0.1;
let score = 0;
function getScore(){
    return score
}
function getToleranceLevel(){
    return toleranceLevel
}
//TODO: Tolerance functions
function increaseToleranceLevel(){
    toleranceLevel += 1; 

}
 
function decreaseToleranceLevel(){
    toleranceLevel -= 1;

}
//TODO: Mode functions
function setModeToRecord(){

}

function setModeToCompare(){

}
//TODO: Score function
function changeScore(){
// this function changes the score by the specified amount 

}
function scoreToLetterGrade(score){
// this function converts the score to a letter grade {S(.9+),A(.8),B(.7),C(.6),D(.5),F(.4-)}
}
function changeScoreDisplay(letter){
// this function changes the score display to the specified letter grade

}
module.exports = {getToleranceLevel,getScore,increaseToleranceLevel,decreaseToleranceLevel,changeScore,scoreToLetterGrade,setModeToCompare,setModeToRecord}


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

}
 
function decreaseToleranceLevel(){

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
function getLetterGrade(score) {
    let roundedScore = Math.round(score);
    let scoreBox = document.getElementById("letter");
    scoreBox.innerText = "B"
    let grades = [[0.9, 'S'], [0.8, 'A'], [0.7, 'B'], [0.6, 'C'], [0.5, 'D'],[0.4, 'F']];
    
    for (let i = 0; i < grades.length; i++) {
        if (roundedScore >= grades[i][0]) {
            return grades[i][1];
        }
    }
    
    return ' '; // Default return value if score is out of range
}
module.exports = {getToleranceLevel,getScore,increaseToleranceLevel,decreaseToleranceLevel,changeScore,scoreToLetterGrade,setModeToCompare,setModeToRecord}

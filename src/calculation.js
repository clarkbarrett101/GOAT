function getLetterGrade(score) {
    let roundedScore = Math.round(score);
    
    let grades = [[0.9, 'S'], [0.8, 'A'], [0.7, 'B'], [0.6, 'C'], [0.5, 'D'],[0.4, 'F']];
    
    for (let i = 0; i < grades.length; i++) {
        if (roundedScore >= grades[i][0]) {
            return grades[i][1];
        }
    }
    
    return ' '; // Default return value if score is out of range
}

let testScore = 85.6; // Example test score
let letterGrade = getLetterGrade(testScore);
console.log("Letter grade: " + letterGrade);

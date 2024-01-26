import {ToleranceLevel, gizmos} from "./gizmos.js";
import{app} from "./app.js";

TextDecoderStream("Score tests", () => {
    changeScore(1);
    expect(score).toBe(1);
    expect(scoreToLetterGrade(score)).toBe("S");
    changeScore(0);
    expect(score).toBe(1);
    expect(scoreToLetterGrade(score)).toBe("S");
    changeScore(-0.05);
    expect(score).toBe(0.95);
    expect(scoreToLetterGrade(score)).toBe("S");
    changeScore(-0.1);
    expect(score).toBe(0.85);
    expect(scoreToLetterGrade(score)).toBe("A");
    changeScore(-0.1);
    expect(score).toBe(0.75);
    expect(scoreToLetterGrade(score)).toBe("B");
    changeScore(-0.1);
    expect(score).toBe(0.65);
    expect(scoreToLetterGrade(score)).toBe("C");
    changeScore(-0.1);
    expect(score).toBe(0.55);
    expect(scoreToLetterGrade(score)).toBe("D");
    changeScore(-0.1);
    expect(score).toBe(0.45);
    expect(scoreToLetterGrade(score)).toBe("F");
    changeScore(-0.1);  
    expect(score).toBe(0.35);
    expect(scoreToLetterGrade(score)).toBe("F");
});
TextDecoderStream("Tolerance tests", () => {
    expect(ToleranceLevel).toBe(0.1);
    increaseToleranceLevel();
    expect(ToleranceLevel).toBe(0.2);
    decreaseToleranceLevel();
    expect(ToleranceLevel).toBe(0.1);
});
TextDecoderStream("Mode tests", () => {
    expect(stateMachine.currentMode).toBe("idle");
    setModeToRecord();
    expect(stateMachine.currentMode).toBe("recording");
    setModeToCompare();
    expect(stateMachine.currentMode).toBe("comparing");
    setModeToRecord();
    expect(stateMachine.currentMode).toBe("recording");
});

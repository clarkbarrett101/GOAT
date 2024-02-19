const Gizmos = require("./gizmos.js");
const {getCurrentMode} = require("./app.js")

test("Score tests", () => {
    Gizmos.changeScore(1);
    expect(Gizmos.getScore()).toBe(1);
    expect(Gizmos.scoreToLetterGrade(Gizmos.getScore())).toBe("S");
    Gizmos.changeScore(0);
    expect(Gizmos.getScore()).toBe(1);
    expect(Gizmos.scoreToLetterGrade(Gizmos.getScore())).toBe("S");
    Gizmos.changeScore(-0.05);
    expect(Gizmos.getScore()).toBe(0.95);
    expect(Gizmos.scoreToLetterGrade(Gizmos.getScore())).toBe("S");
    Gizmos.changeScore(-0.1);
    expect(Gizmos.getScore()).toBe(0.85);
    expect(Gizmos.scoreToLetterGrade(Gizmos.getScore())).toBe("A");
    Gizmos.changeScore(-0.1);
    expect(Gizmos.getScore()).toBe(0.75);
    expect(Gizmos.scoreToLetterGrade(Gizmos.getScore())).toBe("B");
    Gizmos.changeScore(-0.1);
    expect(Gizmos.getScore()).toBe(0.65);
    expect(Gizmos.scoreToLetterGrade(Gizmos.getScore())).toBe("C");
    Gizmos.changeScore(-0.1);
    expect(Gizmos.getScore()).toBe(0.55);
    expect(Gizmos.scoreToLetterGrade(Gizmos.getScore())).toBe("D");
    Gizmos.changeScore(-0.1);
    expect(Gizmos.getScore()).toBe(0.45);
    expect(Gizmos.scoreToLetterGrade(Gizmos.getScore())).toBe("F");
    Gizmos.changeScore(-0.1);  
    expect(Gizmos.getScore()).toBe(0.35);
    expect(Gizmos.scoreToLetterGrade(Gizmos.getScore())).toBe("F");
});
test("Tolerance tests", () => {
    expect(Gizmos.getToleranceLevel).toBe(0.1);
    Gizmos.increaseToleranceLevel();
    expect(Gizmos.getToleranceLevel).toBe(0.2);
    Gizmos.decreaseToleranceLevel();
    expect(Gizmos.getToleranceLevel).toBe(0.1);
});
test("Mode tests", () => {
    let mode = getCurrentMode();
    expect(mode).toBe("idle");
    Gizmos.setModeToRecord();
    expect(getCurrentMode()).toBe("recording");
    Gizmos.setModeToCompare();
    expect(getCurrentMode()).toBe("comparing");
    Gizmos.setModeToRecord();
    expect(getCurrentMode()).toBe("recording");
});

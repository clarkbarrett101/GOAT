import React, { useState } from "react";
import {
  ScoreDisplay,
  ToleranceMeter,
  ThreeDViews,
  RecordButton,
  CompareButton,
} from "./index.js";

const Driver = () => {
  const allModes = ["noRecording", "idle", "recording", "comparing"];
  const [tolerance, setTolerance] = useState(1);
  const [score, setScore] = useState(100);
  const [appMode, setAppMode] = useState("noRecording");

  return (
    <div>
      <ScoreDisplay score={score} setScore={setScore} />
      <ToleranceMeter tolerance={tolerance} setTolerance={setTolerance} />
      <ThreeDViews appMode={appMode} setAppMode={setAppMode} />
      <RecordButton appMode={appMode} setAppMode={setAppMode} />
      <CompareButton appMode={appMode} setAppMode={setAppMode} />
    </div>
  );
};

export default Driver;

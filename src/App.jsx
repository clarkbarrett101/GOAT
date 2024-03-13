import { useState } from "react";
import RecordButton from "./RecordButton";
import "./App.css";

function App() {
  return (
    <div className="Background">
      <RecordButton />
      <div className="BackLayer">
        <div className="Logo" />
        <div className="ScoreBox">
          <div className="ScoreTitle">Score:</div>
          <div className="ScoreText">S</div>
        </div>
        <div className="LiveBox" />
        <div className="RecordedBox" />
        <div className="LiveTitle">Live View</div>
        <div className="RecordedTitle">Recorded</div>
      </div>
    </div>
  );
}

export default App;

import { useState, useRef } from "react";
const ScoreDisplay = ({ score }) => {
  return (
    <div>
      <h1>Score: {score}</h1>
    </div>
  );
};
export default ScoreDisplay;

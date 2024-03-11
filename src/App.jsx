import { useState } from "react";
import Driver from "./Driver";
import "./App.css";

function App() {
  const [driver] = useState(() => new Driver());
  return (
    <div className="App">
      <header className="App-header">
        <h1>Driver</h1>
        <p>Mode: {driver.mode}</p>
        <p>Score: {driver.score}</p>
        <p>Grade: {driver.grade}</p>
      </header>
    </div>
  );
}

export default App;

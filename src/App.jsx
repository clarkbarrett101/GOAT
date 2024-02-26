import { useState } from "react";
import Driver from "./Driver";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <Driver />;
}

export default App;

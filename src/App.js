import "./App.css";
import { useState } from "react";
import ClassTimer from "./ClassTimer";

function App() {
  const [stopTimer, setStop] = useState(false);
  const [autostart, setAutostart] = useState(false);
  const handleStopTimer = () => {
    setStop(true);
    setAutostart(false);
  };
  const handleReturnTimer = () => {
    setStop(false);
    setAutostart(true);
  };

  const messageEven = () => {
    if (!autostart && !stopTimer) {
      return "Треба натиснути Start";
    } else {
      if (stopTimer) {
        return "Таймер зупинено";
      } else {
        return "Час іде";
      }
    }
  };
  const DAYS_IN_MONTHS = 1 * 24 * 60 * 60 * 1000;
  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <h2>{messageEven()}</h2>
      <p>Залишилось часу: </p>
      <ClassTimer
        stopTimer={stopTimer}
        autostart={autostart}
        DAYS_IN_MONTHS={DAYS_IN_MONTHS}
      />
      <button className="btn" type="button" onClick={handleReturnTimer}>
        Start
      </button>
      <button className="btn" type="button" onClick={handleStopTimer}>
        Pause
      </button>
    </div>
  );
}

export default App;

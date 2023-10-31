import { useState, useEffect } from "react";
import { FiPlay } from "react-icons/fi";
import { CiStop1 } from "react-icons/ci";
import { VscDebugRestart } from "react-icons/vsc";
import "./Time.scss";

export default function Time() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const start = () => {
    setTimerRunning(true);
  };

  const stop = () => {
    setTimerRunning(false);
  };

  const reset = () => {
    setTimerRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  useEffect(() => {
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(() => {
        if (seconds === 59) {
          if (minutes === 59) {
            setHours(hours + 1);
            setMinutes(0);
          } else {
            setMinutes(minutes + 1);
          }
          setSeconds(0);
        } else {
          setSeconds(seconds + 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [seconds, minutes, hours, timerRunning]);

  return (
    <div>
      <h1>
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </h1>
      <div className="row">
        <button className="green" onClick={start}>
          <FiPlay className="icone-grande" />
        </button>
        <button className="red" onClick={stop}>
          <CiStop1 className="icone-grande" />
        </button>
        <button className="yellow" onClick={reset}>
          <VscDebugRestart className="icone-grande" />
        </button>
      </div>
    </div>
  );
}

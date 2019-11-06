import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  function transition(initialD, replace = false) {
    if(!replace){
    setHistory(prev => ([...prev, mode]))
  }
  setMode(initialD)

  }
  function back() {
    if (history.length > 0) {
      setMode(history[history.length - 1])
      setHistory(prev => [...prev.slice(0, -1)]);
    }

  }

  return { back, transition, mode };
}

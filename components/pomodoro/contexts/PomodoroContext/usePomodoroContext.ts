import { useContext } from "react";
import { PomodoroContext } from ".";

export function usePomodoroContext() {
  return useContext(PomodoroContext);
}

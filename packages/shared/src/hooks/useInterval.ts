import { useEffect } from "react";
import { CounterStatus } from "../types";

export const useInterval = (ms: number, status: CounterStatus, fn: () => void) => {
  useEffect(() => {
    if (status !== CounterStatus.RUNNING) {
      return;
    }
    const interval = setInterval(() => {
      fn();
    }, ms);

    return () => clearInterval(interval);
  }, [ms, status]);

  return;
};

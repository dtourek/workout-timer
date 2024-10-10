import { useCounter } from "@/hooks/useCounter.tsx";
import { CounterActions, CounterStatus } from "@/types.ts";
import { Play, Pause, TimerResetIcon } from "lucide-react";
import { useCallback } from "react";

export const ActionButtons = () => {
  const { counter, dispatch } = useCounter();

  const handlePause = useCallback(() => {
    dispatch({ type: CounterActions.PAUSE });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: CounterActions.RESET, payload: { timeLeft: 1000 } });
  }, []);
  const handlePlay = useCallback(() => {
    dispatch({ type: CounterActions.START });
  }, []);

  if (counter.status === CounterStatus.RUNNING) {
    return (
      <div className={"flex justify-center"}>
        <div
          className="hover: inline-flex cursor-pointer items-center rounded-full border-2 border-blue-700 p-8 text-center text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          onClick={handlePause}
        >
          <Pause />
        </div>
        <div
          className="hover: inline-flex cursor-pointer items-center rounded-full border-2 border-blue-700 p-8 text-center text-sm font-medium text-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          onClick={handleReset}
        >
          <TimerResetIcon />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div
        className="hover: inline-flex cursor-pointer items-center rounded-full border-2 border-blue-700 p-8 text-center text-sm font-medium text-blue-700 transition-all duration-75 ease-in hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
        onClick={handlePlay}
      >
        <Play />
      </div>
    </div>
  );
};

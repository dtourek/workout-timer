import { useCounter } from "@/hooks/useCounter.tsx";
import { CounterActions, CounterStatus } from "@/types.ts";
import { Pause, Play, TimerResetIcon } from "lucide-react";
import { useCallback } from "react";

export const ActionButtons = () => {
  const { counter, dispatch } = useCounter();
  const isCounterRunning = counter.status === CounterStatus.RUNNING;
  const isCounterPausable = isCounterRunning || counter.status === CounterStatus.PAUSED;

  const handlePause = useCallback(() => {
    if (isCounterPausable) {
      dispatch({ type: CounterActions.PAUSE });
    }
  }, [counter]);

  const handleReset = useCallback(() => {
    dispatch({ type: CounterActions.RESET });
  }, [counter]);

  const handlePlay = useCallback(() => {
    if (!isCounterRunning) {
      dispatch({ type: CounterActions.START });
    }
  }, [counter]);

  const disabledClasses = (isDisabled: boolean) =>
    isDisabled ? "cursor-not-allowed border-2  border-gray-300 text-gray-300 hover:text-gray-300 hover:bg-transparent" : "border-primary";

  return (
    <div className="flex flex-row items-center">
      <div
        className={`cursor-pointer rounded-full border-2 border-white bg-white p-5 text-center text-sm font-medium text-gray-500 shadow-md shadow-gray-300 hover:inline-flex hover:border-2 hover:border-gray-300 hover:text-gray-500 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-300 dark:text-blue-300 dark:shadow-muted dark:hover:bg-gray-500 dark:hover:text-white dark:focus:ring-blue-800`}
        onClick={handleReset}
      >
        <TimerResetIcon />
      </div>
      <div
        className={`${disabledClasses(isCounterRunning)} mx-4 cursor-pointer items-center rounded-full border-2 bg-primary p-8 text-center text-sm font-medium text-primary text-white shadow-md shadow-gray-300 transition-all duration-75 ease-in hover:inline-flex hover:text-white hover:opacity-90 focus:outline-none focus:ring-4 dark:border-primary dark:bg-primary dark:text-white dark:shadow-muted dark:hover:text-white dark:focus:ring-blue-800`}
        onClick={handlePlay}
      >
        <Play />
      </div>
      <div
        className={`${disabledClasses(counter.status === CounterStatus.PAUSED)} cursor-pointer rounded-full border-2 border-white bg-white p-5 text-center text-sm font-medium text-gray-500 shadow-md shadow-gray-300 hover:inline-flex hover:border-2 hover:border-gray-300 hover:text-gray-500 hover:shadow-lg focus:outline-none focus:ring-4 dark:border-blue-300 dark:text-blue-300 dark:shadow-muted dark:hover:bg-gray-500 dark:hover:text-white dark:focus:ring-blue-800`}
        onClick={handlePause}
      >
        <Pause />
      </div>
    </div>
  );
};

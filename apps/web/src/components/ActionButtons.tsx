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

  const disabledClasses = (isDisabled: boolean, isPrimaryButton?: boolean) => {
    if (isDisabled && !isPrimaryButton) {
      return "cursor-not-allowed text-gray-300 hover:text-gray-300 dark:text-gray-500 dark:hover:text-gray-500 dark:border:gray-300 dark:hover:text-gray-500 dark:hover:border-gray-300 dark:focus:ring-gray-300";
    }
    if (isDisabled && isPrimaryButton) {
      return "cursor-not-allowed text-gray-300 hover:text-gray-300 dark:border:gray-300 dark:hover:border-gray-300 dark:focus:ring-gray-800 bg-opacity-50";
    }
    return "cursor-pointer";
  };

  return (
    <div className="flex flex-row items-center">
      <div
        className={`cursor-pointer rounded-full bg-white p-5 text-center text-sm font-medium text-gray-500 shadow-md shadow-gray-300 hover:inline-flex hover:text-gray-500 hover:shadow-lg focus:outline-none focus:ring-4 dark:border-2 dark:border-white dark:bg-transparent dark:text-white dark:shadow-muted dark:hover:bg-background dark:hover:text-white`}
        onClick={handleReset}
      >
        <TimerResetIcon />
      </div>
      <div
        className={`mx-4 items-center rounded-full bg-primary p-8 text-center text-sm font-medium text-primary text-white shadow-md shadow-gray-300 transition-all duration-75 ease-in hover:inline-flex hover:text-white hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-4 dark:border-primary dark:bg-primary dark:text-white dark:shadow-muted dark:hover:text-white dark:focus:ring-blue-800 ${disabledClasses(isCounterRunning, true)}`}
        onClick={handlePlay}
      >
        <Play />
      </div>
      <div
        className={`rounded-full bg-white p-5 text-center text-sm font-medium text-gray-500 shadow-md shadow-gray-300 hover:inline-flex hover:text-gray-500 hover:shadow-lg focus:outline-none focus:ring-4 dark:border-2 dark:border-white dark:bg-transparent dark:text-white dark:shadow-muted dark:hover:bg-background dark:hover:text-white ${disabledClasses(counter.status === CounterStatus.PAUSED)}`}
        onClick={handlePause}
      >
        <Pause />
      </div>
    </div>
  );
};

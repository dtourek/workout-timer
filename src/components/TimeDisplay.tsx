import { useCounter } from "@/hooks/useCounter.tsx";
import { useInterval } from "@/hooks/useInterval.ts";
import { msToTime } from "@/lib/time.ts";
import { CounterActions } from "@/types.ts";

const pad = (n: number) => (n < 10 ? `0${n}` : n);

const displayTime = (ms: number) => {
  const { hours, minutes, seconds } = msToTime(ms);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export const TimeDisplay = () => {
  const { counter, dispatch } = useCounter();
  useInterval(10, counter.status, () => dispatch({ type: CounterActions.COUNT_TIME_LEFT }));

  return (
    <>
      <p>Rounds: {counter.rounds}</p>
      <p>
        Phase: <b>{counter.phase}</b>
      </p>
      <span>{displayTime(counter.timeLeft)}</span>
    </>
  );
};

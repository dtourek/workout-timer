import { Countdown } from "@/components/Countdown.tsx";
import { useCounter } from "@/hooks/useCounter.tsx";
import { useInterval } from "@/hooks/useInterval.ts";
import { phaseSeconds } from "@/lib/time.ts";
import { CounterActions } from "@/types.ts";

export const TimeDisplay = () => {
  const { counter, dispatch } = useCounter();
  useInterval(10, counter.status, () => dispatch({ type: CounterActions.COUNT_TIME_LEFT }));
  const secondsTotalInPhase = phaseSeconds(counter);

  return (
    <div>
      <div className="flex justify-evenly">
        <div className="text-5xl">Rounds left {counter.rounds}</div>
      </div>
      <Countdown secondsRemaining={counter.timeLeft / 100} secondsTotal={secondsTotalInPhase} phase={counter.phase} />
      <div className="flex justify-evenly">
        <div className="text-5xl">{counter.phase}</div>
      </div>
    </div>
  );
};

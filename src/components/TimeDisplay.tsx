import { Countdown } from "@/components/Countdown.tsx";
import { useCounter } from "@/hooks/useCounter.tsx";
import { useInterval } from "@/hooks/useInterval.ts";
import { displayTime, phaseSeconds } from "@/lib/time.ts";
import { toSeconds } from "@/lib/utils.ts";
import { CounterActions } from "@/types.ts";

const DisplayTime = ({ timeLeft }: { timeLeft: number }) => {
  const secondsLeft = toSeconds(timeLeft);
  if (secondsLeft <= 10) {
    return <div className={"flex justify-center p-4 text-6xl text-red-800"}>{displayTime(timeLeft)}</div>;
  }
  return <div className={"flex justify-center p-4 text-6xl"}>{displayTime(timeLeft)}</div>;
};

export const TimeDisplay = () => {
  const { counter, dispatch } = useCounter();
  useInterval(10, counter.status, () => dispatch({ type: CounterActions.COUNT_TIME_LEFT }));
  const secondsTotalInPhase = phaseSeconds(counter);

  return (
    <div>
      <div className="flex justify-evenly">
        <div className="text-5xl">Rounds left {counter.rounds}</div>
      </div>
      <div>
        <Countdown secondsRemaining={counter.timeLeft / 100} secondsTotal={secondsTotalInPhase} phase={counter.phase} />
      </div>
      <div className="flex justify-evenly">
        <div className="text-5xl">{counter.phase}</div>
      </div>
      <DisplayTime timeLeft={counter.timeLeft} />
    </div>
  );
};

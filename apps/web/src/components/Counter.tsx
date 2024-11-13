import { Countdown } from "@/components/Countdown.tsx";
import { phaseSeconds } from "@/lib/time.ts";
import { memo } from "react";
import { CounterActions, CounterPhase, useCounter, useInterval } from "shared";

const RoundsLeft = memo(({ rounds, phase }: { rounds: number; phase: CounterPhase }) => (
  <div className="flex justify-between py-10">
    <div className="uppercase">
      <span className="font-bold">Rounds left:</span> {rounds}
    </div>
    <div className="uppercase">
      <span className="font-bold">Phase:</span> {phase}
    </div>
  </div>
));

export const Counter = memo(() => {
  const { counter, dispatch } = useCounter();
  useInterval(10, counter.status, () => dispatch({ type: CounterActions.COUNT_TIME_LEFT }));
  const secondsTotalInPhase = phaseSeconds(counter);

  return (
    <div>
      <Countdown secondsRemaining={counter.counter.timeLeft / 100} secondsTotal={secondsTotalInPhase} phase={counter.phase} />
      <RoundsLeft rounds={counter.counter.rounds} phase={counter.phase} />
    </div>
  );
});

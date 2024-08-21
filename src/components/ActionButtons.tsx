import { Button } from "@/components/ui/Button.tsx";
import { useCounter } from "@/hooks/useCounter.tsx";
import { CounterActions } from "@/types.ts";
import { Pause, Play, RotateCcw } from "lucide-react";

export const ActionButtons = () => {
  const { counter, dispatch } = useCounter();

  const handleReset = () => {
    dispatch({ type: CounterActions.RESET, payload: { timeLeft: 1000 } });
  };

  return (
    <div className="row-auto space-x-5">
      <Button icon={<Play className="mr-2 h-4 w-4" />} disabled={counter.status === "running"} variant="success" onClick={() => dispatch({ type: CounterActions.START })}>
        Start
      </Button>
      <Button icon={<Pause className="mr-2 h-4 w-4" />} variant="outline" onClick={() => dispatch({ type: CounterActions.PAUSE })}>
        Pause
      </Button>
      <Button icon={<RotateCcw className="mr-2 h-4 w-4" />} variant="error" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
};

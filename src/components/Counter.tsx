import { ActionButtons } from "@/components/ActionButtons.tsx";
import { SetTimeForm } from "@/components/set-time/Form.tsx";
import { TimeDisplay } from "@/components/TimeDisplay.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { CounterPhase } from "@/types.ts";
import { useCallback, useState } from "react";

export const Counter = () => {
  const [phase, setPhase] = useState<CounterPhase | null>(null);

  const handleSetTime = useCallback(() => {
    setPhase(null);
  }, []);

  const handleSwitchPhase = useCallback(() => setPhase(CounterPhase.WORK), []);

  return (
    <div>
      {phase ? (
        <>
          <h1>Setting phase: {phase}</h1>
          <SetTimeForm editingPhase={CounterPhase.WORK} handleSetTime={handleSetTime} />
        </>
      ) : (
        <>
          <Button onClick={handleSwitchPhase}>Edit</Button>
          <TimeDisplay />
          <ActionButtons />
        </>
      )}
    </div>
  );
};

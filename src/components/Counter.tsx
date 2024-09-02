import { ActionButtons } from "@/components/ActionButtons.tsx";
import { SetTimeForm } from "@/components/set-time/Form.tsx";
import { TimeDisplay } from "@/components/TimeDisplay.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { CounterPhase, IEditablePhases } from "@/types.ts";
import { useCallback, useState } from "react";

export const Counter = () => {
  const [phase, setPhase] = useState<IEditablePhases | null>(null);

  const handleSetTime = useCallback(() => {
    setPhase(null);
  }, []);

  return (
    <div>
      <Button onClick={() => setPhase(CounterPhase.WORK)}>Set Work</Button>
      <Button onClick={() => setPhase(CounterPhase.REST)}>Set Rest</Button>
      <Button onClick={() => setPhase(CounterPhase.PREPARE)}>Set Prepare</Button>
      {phase ? (
        <>
          <h1>Setting phase: {phase}</h1>
          <SetTimeForm editingPhase={phase} handleSetTime={handleSetTime} />
        </>
      ) : (
        <>
          <TimeDisplay />
          <ActionButtons />
        </>
      )}
    </div>
  );
};

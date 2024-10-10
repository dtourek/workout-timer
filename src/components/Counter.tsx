import { ActionButtons } from "@/components/ActionButtons.tsx";
import { TimeDisplay } from "@/components/TimeDisplay.tsx";
import { memo } from "react";

export const Counter = memo(() => {
  return (
    <div className={"flex flex-col justify-center"}>
      <TimeDisplay />
      <ActionButtons />
    </div>
  );
});

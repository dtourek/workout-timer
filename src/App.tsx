import { Modal } from "@/components/Modal.tsx";
import { ModeToggle } from "@/components/ModeToggle.tsx";
import { SetTimeDrawer } from "@/components/SetTimeDrawer.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import { useCounter } from "@/hooks/useCounter.tsx";
import { isCounterFinished } from "@/lib/utils.ts";
import { CounterActions } from "@/types.ts";
import { memo, useCallback } from "react";
import { Counter } from "./components/Counter";

const Header = () => {
  return (
    <div className={"flex justify-between"}>
      <SetTimeDrawer />
      <ModeToggle />
    </div>
  );
};

const Body = memo(() => {
  const { counter, dispatch } = useCounter();

  return (
    <div className={"flex content-center items-center justify-center"}>
      <Counter />
      <Toaster />
      <Modal
        defaultOpen={isCounterFinished(counter.phase)}
        title="Finished!"
        confirmButtonLabel="Confirm"
        description="Nice way to go. Keep up your work!"
        onConfirm={useCallback(() => dispatch({ type: CounterActions.RESET }), [])}
      />
    </div>
  );
});

const App = () => {
  return (
    <div className={"h-dvh"}>
      <Header />
      <Body />
    </div>
  );
};

export default App;

import { ActionButtons } from "@/components/ActionButtons.tsx";
import { Modal } from "@/components/Modal.tsx";
import { ModeToggle } from "@/components/ModeToggle.tsx";
import { SetTimeDrawer } from "@/components/SetTimeDrawer.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import { useCounter } from "@/hooks/useCounter.tsx";
import { isCounterFinished } from "@/lib/utils.ts";
import { CounterActions } from "@/types.ts";
import { memo, useCallback } from "react";
import { Counter } from "./components/Counter";

const Title = () => {
  const { counter } = useCounter();
  return <h1 className="text-5xl text-primary">{counter.name}</h1>;
};

const Header = () => {
  return (
    <div>
      <div className={"flex justify-between"}>
        <SetTimeDrawer />
        <ModeToggle />
      </div>
      <div className="flex content-center justify-center p-4">
        <Title />
      </div>
    </div>
  );
};

const Body = memo(() => {
  const { counter, dispatch } = useCounter();

  return (
    <div className={"flex h-full flex-col items-center justify-center bg-[#F6F9F7] dark:bg-[#26282C]"}>
      <Counter />
      <ActionButtons />
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
    <div className={"flex h-dvh min-h-full flex-col"}>
      <Header />
      <Body />
    </div>
  );
};

export default App;

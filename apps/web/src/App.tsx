import { ActionButtons } from "@/components/ActionButtons.tsx";
import { Modal } from "@/components/Modal.tsx";
import { ModeToggle } from "@/components/ModeToggle.tsx";
import { SetTimeDrawer } from "@/components/SetTimeDrawer.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import { useCounter } from "@/hooks/useCounter.tsx";
import { appData } from "@/initialData.ts";
import { isCounterFinished } from "@/lib/utils.ts";
import { CounterActions } from "@/types.ts";
import { memo, PropsWithChildren, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Counter } from "./components/Counter.tsx";

const Meta = memo(({ name, children }: { name: string } & PropsWithChildren) => {
  return (
    <>
      <Helmet>
        <title>
          {appData.title} | {name}
        </title>
        <meta name="description" content={`Timer "${name}"`} />
      </Helmet>
      {children}
    </>
  );
});

const Title = () => {
  const { counter } = useCounter();
  return (
    <Meta name={counter.name}>
      <h1 className="py-2 text-5xl text-primary">{counter.name}</h1>
    </Meta>
  );
};

const Header = () => {
  return (
    <div>
      <div className={"flex items-center justify-between"}>
        <SetTimeDrawer />
        <Title />
        <ModeToggle />
      </div>
    </div>
  );
};

const Body = memo(() => {
  const { counter, dispatch } = useCounter();

  return (
    <div className={"flex h-full flex-col items-center justify-around bg-[#F6F9F7] dark:bg-[#212326]"}>
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

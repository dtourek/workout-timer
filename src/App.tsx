import { ActionButtons } from "@/components/ActionButtons.tsx";
import { TimeDisplay } from "./components/TimeDisplay.tsx";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Workout Timer</h1>
      <TimeDisplay />
      <ActionButtons />
    </>
  );
}

export default App;

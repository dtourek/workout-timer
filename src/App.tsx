import { SetTimeDrawer } from "@/components/SetTimeDrawer.tsx";
import { ModeToggle } from "@/components/ModeToggle.tsx";
import { ThemeProvider } from "@/components/ThemeProvider.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { CounterProvider } from "@/hooks/useCounter.tsx";
import { initialData } from "@/initialData.ts";
import { Counter } from "./components/Counter";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="counter-theme">
      <TooltipProvider>
        <CounterProvider initialData={initialData}>
          <div className={"h-dvh"}>
            <div className={"flex justify-between"}>
              <SetTimeDrawer />
              <ModeToggle />
            </div>
            <div className={"flex content-center items-center justify-center"}>
              <Counter />
              <Toaster />
            </div>
          </div>
        </CounterProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;

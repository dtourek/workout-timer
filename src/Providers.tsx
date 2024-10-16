import { ThemeProvider } from "@/components/ThemeProvider.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { CounterProvider } from "@/hooks/useCounter.tsx";
import { initialData } from "@/initialData.ts";
import { PropsWithChildren } from "react";
import React from "react";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <CounterProvider initialData={initialData}>{children}</CounterProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};

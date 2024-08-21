import { CounterProvider } from "@/hooks/useCounter.tsx";
import { initialData } from "@/initialData.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CounterProvider initialData={initialData}>
      <App />
    </CounterProvider>
  </StrictMode>,
);

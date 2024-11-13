import { CounterPhase } from "shared";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toSeconds = (time: number): number => Math.floor(time / 100);

export const colorByPhase = {
  [CounterPhase.PREPARE]: "#f6ad55",
  [CounterPhase.WORK]: "#f56565",
  [CounterPhase.REST]: "#60e6a8",
  [CounterPhase.FINISHED]: "#60e6a8",
  [CounterPhase.IDLE]: "#ffffff",
};

export const isCounterFinished = (phase: CounterPhase) => phase === CounterPhase.FINISHED;

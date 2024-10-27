import { ICounter } from "@/types.ts";

export const msToTime = (ms: number) => {
  const hours = Math.floor(ms / 100 / 60 / 60);
  const minutes = Math.floor((ms / 100 / 60) % 60);
  const seconds = Math.floor((ms / 100) % 60);
  return { hours, minutes, seconds };
};

const pad = (n: number) => (n < 10 ? `0${n}` : n);

export const displayTime = (ms: number) => {
  const { hours, minutes, seconds } = msToTime(ms);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export const phaseSeconds = (counter: ICounter) => {
  if (counter.phase === "prepare") {
    return counter.prepareTime / 100;
  }
  if (counter.phase === "work") {
    return counter.workTime / 100;
  }
  if (counter.phase === "rest") {
    return counter.restTime / 100;
  }
  return 0;
};

import { CounterPhase, CounterStatus, ICounter } from "@/types.ts";

interface IAppData {
  title: string;
  sounds: { finished: string };
}

export const appData: IAppData = {
  title: "Simple Timer",
  sounds: { finished: "finished.mp3" },
};

export const initialData: ICounter = {
  name: "HIIT Workout",
  status: CounterStatus.IDLE,
  phase: CounterPhase.IDLE,
  settings: {
    rounds: 3,
    workTime: 500,
    restTime: 300,
    prepareTime: 300,
  },
  counter: {
    rounds: 3,
    workTime: 500,
    restTime: 300,
    prepareTime: 300,
    timeLeft: 300,
  },
};

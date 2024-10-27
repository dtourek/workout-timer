import { CounterPhase, CounterStatus, ICounter } from "@/types.ts";

interface IAppData {
  title: string;
}

export const appData: IAppData = {
  title: "Simple Timer",
};

export const initialData: ICounter = {
  name: "HIIT Workout",
  status: CounterStatus.IDLE,
  phase: CounterPhase.IDLE,
  rounds: 3,
  workTime: 500,
  restTime: 300,
  prepareTime: 300,
  timeLeft: 300,
};

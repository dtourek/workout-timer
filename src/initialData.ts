import { CounterStatus, ICounter } from "@/types.ts";

export const initialData: ICounter = {
  name: "Workout Timer",
  status: CounterStatus.IDLE,
  rounds: 3,
  workTime: 20,
  restTime: 10,
  currentRound: 0,
  prepareTime: 10,
  timeLeft: 1000,
};

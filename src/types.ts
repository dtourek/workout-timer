export enum CounterStatus {
  IDLE = "idle",
  RUNNING = "running",
  PAUSED = "paused",
}

export interface ICounter {
  name: string;
  status: CounterStatus;
  rounds: number;
  workTime: number;
  restTime: number;
  currentRound: number;
  prepareTime: number;
  timeLeft: number;
}

export enum CounterActions {
  START = "START",
  PAUSE = "PAUSE",
  RESET = "RESET",
  COUNT_TIME_LEFT = "COUNT_TIME_LEFT", // Action to decrement the time left
}

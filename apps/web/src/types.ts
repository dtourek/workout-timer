export enum CounterStatus {
  IDLE = "idle",
  RUNNING = "running",
  PAUSED = "paused",
}

export enum CounterPhase {
  WORK = "work",
  REST = "rest",
  PREPARE = "prepare",
  IDLE = "idle",
  FINISHED = "finished",
}

export interface ICounter {
  name: string;
  status: CounterStatus;
  phase: CounterPhase;
  rounds: number;
  workTime: number;
  restTime: number;
  prepareTime: number;
  timeLeft: number;
}

export enum CounterActions {
  START = "START",
  PAUSE = "PAUSE",
  RESET = "RESET",
  COUNT_TIME_LEFT = "COUNT_TIME_LEFT", // Action to decrement the time left
  SET = "SET",
}
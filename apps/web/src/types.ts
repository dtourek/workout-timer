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

type ICounterSettings = { rounds: number; workTime: number; restTime: number; prepareTime: number };
type ICounterTimeLeft = ICounterSettings & { timeLeft: number };

export interface ICounter {
  name: string;
  status: CounterStatus;
  phase: CounterPhase;
  settings: ICounterSettings;
  counter: ICounterTimeLeft;
}

export enum CounterActions {
  START = "START",
  PAUSE = "PAUSE",
  RESET = "RESET",
  COUNT_TIME_LEFT = "COUNT_TIME_LEFT", // Action to decrement the time left
  SET = "SET",
}

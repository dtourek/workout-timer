export enum CounterStatus {
  IDLE = "idle",
  RUNNING = "running",
  PAUSED = "paused",
}

export enum CounterPhase {
  WORK = "work",
  REST = "rest",
  PREPARE = "prepare", // TODO implement in counter
  IDLE = "idle",
  FINISHED = "finished",
}

export type IEditablePhases = CounterPhase.WORK | CounterPhase.REST | CounterPhase.PREPARE;

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
  SWITCH_PHASE = "SWITCH_PHASE", // Action to switch the phase
  SET = "SET",
}

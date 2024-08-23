import { initialData } from "@/initialData.ts";
import { CounterActions, CounterPhase, CounterStatus, ICounter } from "@/types.ts";
import { createContext, PropsWithChildren, Reducer, useContext, useReducer } from "react";

interface ICounterContext {
  counter: ICounter;
  dispatch: (action: ICounterActions) => void;
}

type StartCounter = { type: CounterActions.START };
type PauseCounter = { type: CounterActions.PAUSE };
type ResetCounter = { type: CounterActions.RESET; payload: { timeLeft: number } };
type TimeLeftCounter = { type: CounterActions.COUNT_TIME_LEFT };

type ICounterActions = StartCounter | PauseCounter | ResetCounter | TimeLeftCounter;

const handleSwitchPhase = (state: ICounter): ICounter => {
  if (state.phase === CounterPhase.WORK) {
    return { ...state, phase: CounterPhase.REST, timeLeft: state.restTime };
  }
  if (state.phase === CounterPhase.REST) {
    return { ...state, phase: CounterPhase.WORK, timeLeft: state.workTime, rounds: state.rounds - 1 };
  }
  return state;
};

const handleTimeLeft = (state: ICounter): ICounter => {
  const hasTimeLeft = state.timeLeft > 0;
  if (!hasTimeLeft && state.rounds === 0 && state.phase === CounterPhase.REST) {
    alert("All rounds completed");
    return { ...state, phase: CounterPhase.FINISHED };
  }

  if (!hasTimeLeft) {
    return handleSwitchPhase(state);
  }

  return { ...state, timeLeft: state.timeLeft - 1, status: CounterStatus.RUNNING };
};

const startOrResume = (state: ICounter): Pick<ICounter, "phase" | "timeLeft"> => {
  const timeLeft = state.status === CounterStatus.PAUSED ? state.timeLeft : initialData.workTime;
  const phase = state.status === CounterStatus.PAUSED ? state.phase : CounterPhase.WORK;
  return { timeLeft, phase };
};

const counterReducer: Reducer<ICounter, ICounterActions> = (state, action) => {
  switch (action.type) {
    case "START":
      return { ...state, status: CounterStatus.RUNNING, ...startOrResume(state) };
    case "PAUSE":
      return state.status === CounterStatus.RUNNING ? { ...state, status: CounterStatus.PAUSED } : state;
    case "RESET":
      return { ...state, status: CounterStatus.IDLE, timeLeft: initialData.prepareTime, phase: CounterPhase.IDLE, rounds: initialData.rounds };
    case "COUNT_TIME_LEFT":
      return handleTimeLeft(state);
    default:
      throw new Error("Invalid action");
  }
};

const CounterContext = createContext<ICounterContext | null>(null);

export const CounterProvider = ({ children, initialData }: { initialData: ICounter } & PropsWithChildren) => {
  const [counter, dispatch] = useReducer(counterReducer, initialData);

  return <CounterContext.Provider value={{ counter, dispatch }}>{children}</CounterContext.Provider>;
};

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};

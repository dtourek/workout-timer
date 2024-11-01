import { CounterActions, CounterPhase, CounterStatus, ICounter } from "@/types.ts";
import { createContext, PropsWithChildren, Reducer, useContext, useReducer } from "react";

interface ICounterContext {
  counter: ICounter;
  dispatch: (action: ICounterActions) => void;
}

type StartCounter = { type: CounterActions.START };
type PauseCounter = { type: CounterActions.PAUSE };
type ResetCounter = { type: CounterActions.RESET };
type TimeLeftCounter = { type: CounterActions.COUNT_TIME_LEFT };
type SetCounter = { type: CounterActions.SET; payload: Partial<ICounter> };

type ICounterActions = StartCounter | PauseCounter | ResetCounter | TimeLeftCounter | SetCounter;

const handleSwitchPhase = (state: ICounter): ICounter => {
  if (state.phase === CounterPhase.PREPARE) {
    return { ...state, phase: CounterPhase.WORK, counter: { ...state.counter, timeLeft: state.counter.workTime } };
  }
  if (state.phase === CounterPhase.WORK) {
    return { ...state, phase: CounterPhase.REST, counter: { ...state.counter, timeLeft: state.counter.restTime } };
  }
  if (state.phase === CounterPhase.REST) {
    return { ...state, phase: CounterPhase.WORK, counter: { ...state.counter, timeLeft: state.counter.workTime, rounds: state.counter.rounds - 1 } };
  }
  return state;
};

const hasTimeLeftRunOut = (counter: ICounter): boolean => counter.counter.timeLeft < 0;
const shouldCounterFinish = (counter: ICounter): boolean => hasTimeLeftRunOut(counter) && counter.counter.rounds === 1 && counter.phase === CounterPhase.REST;

const handleTimeLeft = (state: ICounter): ICounter => {
  if (shouldCounterFinish(state)) {
    return { ...state, status: CounterStatus.IDLE, phase: CounterPhase.FINISHED, counter: { ...state.settings, timeLeft: 0 } };
  }

  if (hasTimeLeftRunOut(state)) {
    return handleSwitchPhase(state);
  }

  return { ...state, status: CounterStatus.RUNNING, counter: { ...state.counter, timeLeft: state.counter.timeLeft - 1 } };
};

const startOrResume = (state: ICounter): { timeLeft: ICounter["counter"]["timeLeft"]; phase: ICounter["phase"] } => {
  const isPaused = state.status === CounterStatus.PAUSED;
  const timeLeft = isPaused ? state.counter.timeLeft : state.counter.prepareTime;
  const phase = isPaused ? state.phase : CounterPhase.PREPARE;
  return { timeLeft, phase };
};

const counterReducer: Reducer<ICounter, ICounterActions> = (state, action) => {
  switch (action.type) {
    case CounterActions.START:
      return { ...state, status: CounterStatus.RUNNING, ...startOrResume(state) };
    case CounterActions.PAUSE:
      return state.status === CounterStatus.RUNNING ? { ...state, status: CounterStatus.PAUSED } : state;
    case CounterActions.RESET:
      return { ...state, counter: { ...state.settings, timeLeft: state.settings.prepareTime }, status: CounterStatus.IDLE, phase: CounterPhase.IDLE };
    case CounterActions.COUNT_TIME_LEFT:
      return handleTimeLeft(state);
    case CounterActions.SET:
      return { ...state, ...action.payload };
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

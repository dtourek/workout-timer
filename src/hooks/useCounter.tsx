import { CounterActions, CounterStatus, ICounter } from "@/types.ts";
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

const handleTimeLEft = (state: ICounter): ICounter => {
  const shouldReset = state.timeLeft > 0;
  return { ...state, timeLeft: shouldReset ? state.timeLeft - 1 : 0, status: shouldReset ? CounterStatus.RUNNING : CounterStatus.IDLE };
};

const counterReducer: Reducer<ICounter, ICounterActions> = (state, action) => {
  switch (action.type) {
    case "START":
      return { ...state, status: CounterStatus.RUNNING };
    case "PAUSE":
      return state.status === CounterStatus.RUNNING ? { ...state, status: CounterStatus.PAUSED } : state;
    case "RESET":
      return { ...state, status: CounterStatus.IDLE, timeLeft: action.payload.timeLeft };
    case "COUNT_TIME_LEFT":
      return handleTimeLEft(state);
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

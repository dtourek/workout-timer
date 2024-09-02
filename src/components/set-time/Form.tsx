import { Fields } from "@/components/set-time/Fields.tsx";
import { IField } from "@/components/set-time/interface.ts";
import { formSchema, IFormValues } from "@/lib/model.ts";
import { msToTime } from "@/lib/time.ts";
import { memo } from "react";
import { Button } from "@/components/ui/Button.tsx";
import { useCounter } from "@/hooks/useCounter.tsx";
import { CounterActions, CounterPhase, IEditablePhases } from "@/types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/Form.tsx";

interface ISetTimeProps {
  editingPhase: IEditablePhases;
  handleSetTime: () => void;
}

const fields: IField[] = [
  { name: "hours", type: "number", label: "Hours", min: 0, max: 23 },
  { name: "minutes", type: "number", label: "Minutes", min: 0, max: 59 },
  { name: "seconds", type: "number", label: "Seconds", min: 0, max: 59 },
];

const getPhase = (phase: IEditablePhases): "prepareTime" | "workTime" | "restTime" => {
  if (phase === CounterPhase.WORK) {
    return "workTime";
  }
  if (phase === CounterPhase.REST) {
    return "restTime";
  }
  return "prepareTime";
};

export const SetTimeForm = memo(({ editingPhase, handleSetTime }: ISetTimeProps) => {
  const { dispatch, counter } = useCounter();
  const phase = getPhase(editingPhase);
  const time = msToTime(counter[phase]);
  const form = useForm<IFormValues>({
    resolver: zodResolver(formSchema),
    values: time,
  });

  const onSubmit = (values: IFormValues) => {
    const toTimeLeft: number = ((values.hours ?? 0) * 3600 + (values.minutes ?? 0) * 60 + values.seconds) * 100;
    dispatch({ type: CounterActions.SET, payload: { [phase]: toTimeLeft, timeLeft: phase === "prepareTime" ? toTimeLeft : counter.timeLeft } });
    handleSetTime();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <>
          <Fields fields={fields} control={form.control} />
          <Button type="submit">Submit</Button>
        </>
      </form>
    </Form>
  );
});

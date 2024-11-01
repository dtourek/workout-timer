import { Fields } from "@/components/set-time/Fields.tsx";
import { IField } from "@/components/set-time/interface.ts";
import { formSchema, IFormValues } from "@/lib/model.ts";
import { msToTime } from "@/lib/time.ts";
import { memo, useCallback } from "react";
import { Button } from "@/components/ui/Button.tsx";
import { useCounter } from "@/hooks/useCounter.tsx";
import { CounterActions, CounterPhase, ICounter } from "@/types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form } from "../ui/Form.tsx";

const fields: IField[] = [
  { name: "name", type: "text", label: "Workout name", placeholder: "Name a time" },
  { name: "rounds", type: "select", label: "Rounds", options: Array.from({ length: 99 }, (_, i) => ({ label: String(i + 1), value: i + 1 })) },
  {
    type: "object",
    name: CounterPhase.PREPARE,
    label: "Prepare time",
    fields: [
      { name: "prepare-hours", type: "select", label: "Hours", options: Array.from({ length: 24 }, (_, i) => ({ label: String(i), value: i })) },
      { name: "prepare-minutes", type: "select", label: "Minutes", options: Array.from({ length: 60 }, (_, i) => ({ label: String(i), value: i })) },
      { name: "prepare-seconds", type: "select", label: "Seconds", options: Array.from({ length: 60 }, (_, i) => ({ label: String(i), value: i })) },
    ],
  },
  {
    type: "object",
    label: "Work time",
    name: CounterPhase.WORK,
    fields: [
      { name: "work-hours", type: "select", label: "Hours", options: Array.from({ length: 24 }, (_, i) => ({ label: String(i), value: i })) },
      { name: "work-minutes", type: "select", label: "Minutes", options: Array.from({ length: 60 }, (_, i) => ({ label: String(i), value: i })) },
      { name: "work-seconds", type: "select", label: "Seconds", options: Array.from({ length: 60 }, (_, i) => ({ label: String(i), value: i })) },
    ],
  },
  {
    type: "object",
    label: "Rest time",
    name: CounterPhase.REST,
    fields: [
      { name: "rest-hours", type: "select", label: "Hours", options: Array.from({ length: 24 }, (_, i) => ({ label: String(i), value: i })) },
      { name: "rest-minutes", type: "select", label: "Minutes", options: Array.from({ length: 60 }, (_, i) => ({ label: String(i), value: i })) },
      { name: "rest-seconds", type: "select", label: "Seconds", options: Array.from({ length: 60 }, (_, i) => ({ label: String(i), value: i })) },
    ],
  },
];

const prefixKeys = (prefix: string, obj: Record<string, number>) => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      acc[`${prefix}-${key}`] = obj[key];
      return acc;
    },
    {} as Record<string, number>,
  );
};

const getFieldValues = (counter: ICounter): IFormValues => {
  const prepareTime = msToTime(counter.settings.prepareTime);
  const workTime = msToTime(counter.settings.workTime);
  const restTime = msToTime(counter.settings.restTime);
  return {
    rounds: counter.counter.rounds,
    name: counter.name,
    ...prefixKeys(CounterPhase.PREPARE, prepareTime),
    ...prefixKeys(CounterPhase.WORK, workTime),
    ...prefixKeys(CounterPhase.REST, restTime),
  } as IFormValues;
};

const toTimeLeft = (hours: number, minutes: number, seconds: number): number => ((hours ?? 0) * 3600 + (minutes ?? 0) * 60 + seconds) * 100;

interface ISetTimeFormProps {
  handleSubmit: () => void;
}

export const SetTimeForm = memo(({ handleSubmit }: ISetTimeFormProps) => {
  const { dispatch, counter } = useCounter();

  const form = useForm<IFormValues>({
    resolver: zodResolver(formSchema),
    values: getFieldValues(counter),
  });

  const onSubmit = useCallback(
    (values: IFormValues) => {
      const prepareTimeLeft = toTimeLeft(values["prepare-hours"], values["prepare-minutes"], values["prepare-seconds"]);
      const settings = {
        rounds: values.rounds,
        prepareTime: prepareTimeLeft,
        workTime: toTimeLeft(values["work-hours"], values["work-minutes"], values["work-seconds"]),
        restTime: toTimeLeft(values["rest-hours"], values["rest-minutes"], values["rest-seconds"]),
      };

      dispatch({ type: CounterActions.SET, payload: { name: values.name, settings, counter: { ...settings, timeLeft: prepareTimeLeft } } });
      toast.success(`Timer "${values.name}" has been set, it's ready to start!`);
      handleSubmit();
    },
    [handleSubmit, dispatch],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <>
          <Fields fields={fields} form={form} />
          <div className="flex justify-end gap-5">
            <Button type="reset" disabled={form.formState.isSubmitting} variant="secondary">
              Reset
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Set
            </Button>
          </div>
        </>
      </form>
    </Form>
  );
});

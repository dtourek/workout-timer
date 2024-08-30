import { IField } from "@/components/set-time/interface.ts";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form.tsx";
import { Input } from "@/components/ui/Input.tsx";
import { Slider } from "@/components/ui/Slider.tsx";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface IFieldsProps<T extends FieldValues> {
  fields: IField[];
  control: UseFormReturn<T>["control"];
}

export const Fields = <T extends FieldValues>({ fields, control }: IFieldsProps<T>) => {
  return (
    <>
      {fields.map((formField) => (
        <FormField
          key={formField.name}
          control={control}
          name={formField.name as Path<T>}
          render={({ field }) => (
            <FormItem key={formField.name}>
              <FormLabel>
                {formField.label}: {field.value}
              </FormLabel>
              <FormControl>
                <Input {...field} {...formField} min={formField.min} max={formField.max} />
              </FormControl>
              <FormControl>
                <Slider
                  step={1}
                  defaultValue={[field.value]}
                  min={formField.min}
                  max={formField.max}
                  onChange={(event) => {
                    field.onChange([Number((event.target as HTMLInputElement).value)]);
                  }}
                />
              </FormControl>
              <FormDescription>Set hours</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
};

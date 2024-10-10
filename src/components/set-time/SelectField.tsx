import { ISelectField } from "@/components/set-time/interface.ts";
import { FormLabel } from "@/components/ui/Form.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { memo } from "react";
import { UseFormReturn } from "react-hook-form";

interface ISelectProps<T> {
  field: ISelectField<T>;
  form: UseFormReturn;
}

export const SelectField = memo(<T,>({ field, form }: ISelectProps<T>) => {
  const fieldValue = field.value;

  return (
    <>
      <FormLabel>{field.label}</FormLabel>
      <Select
        defaultValue={String(fieldValue)}
        onValueChange={(value) => {
          form.setValue(field.name, Number(value));
        }}
      >
        <SelectTrigger className="w-[5rem]">
          <SelectValue placeholder={fieldValue ?? field.placeholder ?? "Select value"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {field.options.map((option) => (
              <SelectItem
                value={option.label}
                key={String(option.value)}
                onSelect={() => {
                  form.setValue(field.name, option.value);
                }}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
});

import { ISelectField } from "@/components/set-time/interface.ts";
import { FormLabel } from "@/components/ui/Form.tsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { IFormValues } from "@/lib/model.ts";
import { memo } from "react";
import { UseFormReturn } from "react-hook-form";

interface ISelectProps {
  field: ISelectField<number>;
  form: UseFormReturn<IFormValues>;
}

export const SelectField = memo(({ field, form }: ISelectProps) => {
  const fieldValue = field.value;
  const fieldName = field.name as keyof IFormValues;

  return (
    <>
      <FormLabel>{field.label}</FormLabel>
      <Select
        defaultValue={String(fieldValue)}
        onValueChange={(value) => {
          form.setValue(fieldName, Number(value));
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
                  form.setValue(fieldName, Number(option.value));
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

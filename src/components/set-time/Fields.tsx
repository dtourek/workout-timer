import { SelectField } from "@/components/set-time/SelectField.tsx";
import { IField, INumberField, IObjectField, ISelectField } from "@/components/set-time/interface.ts";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form.tsx";
import { Input } from "@/components/ui/Input.tsx";
import { IFormValues } from "@/lib/model.ts";
import { memo } from "react";
import { UseFormReturn } from "react-hook-form";

interface IFieldsProps {
  fields: IField[];
  form: UseFormReturn<IFormValues>;
}

const composeNestedFieldName = (parentName: IField["name"], fieldName: IField["name"]): string => [parentName, fieldName].join(".");
const isObjectField = (field: IField): field is IObjectField => field.type === "object";
const isSelectField = (field: IField): field is ISelectField => field.type === "select";
const isNumberField = (field: IField): field is INumberField => field.type === "number";

const memiozedSelectField = (field: ISelectField, value: number): ISelectField => ({ ...field, value });

const Field = memo(({ field, form }: { field: IField; form: UseFormReturn<IFormValues> }) => {
  const fieldName = field.name as keyof IFormValues;

  return (
    <FormField
      key={fieldName}
      control={form.control}
      name={fieldName}
      render={({ field: formField }) => (
        <FormItem key={fieldName}>
          {isSelectField(field) && (
            <>
              <FormControl>
                <SelectField field={memiozedSelectField(field, formField.value)} form={form} />
              </FormControl>
            </>
          )}
          {isNumberField(field) && (
            <>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input {...formField} {...field} min={field.min} max={field.max} />
              </FormControl>
            </>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
});

export const Fields = memo(({ fields, form }: IFieldsProps) => {
  return (
    <>
      {fields.map((field) => {
        if (isObjectField(field)) {
          return (
            <div>
              <FormLabel>{field.label}</FormLabel>
              <div className={"flex gap-1"}>
                {field.fields.map((objectField) => (
                  <Field key={composeNestedFieldName(field.name, objectField.name)} field={objectField} form={form} />
                ))}
              </div>
            </div>
          );
        }
        return <Field field={field} form={form} />;
      })}
    </>
  );
});

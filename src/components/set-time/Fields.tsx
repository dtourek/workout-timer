import { SelectField } from "@/components/set-time/SelectField.tsx";
import { IField, INumberField, IObjectField, ISelectField } from "@/components/set-time/interface.ts";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form.tsx";
import { Input } from "@/components/ui/Input.tsx";
import { memo } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface IFieldsProps {
  fields: IField[];
  form: UseFormReturn;
}

const composeNestedFieldName = (parentName: IField["name"], fieldName: IField["name"]): string => [parentName, fieldName].join(".");
const isObjectField = (field: IField): field is IObjectField => field.type === "object";
const isSelectField = <T extends string = string>(field: IField): field is ISelectField<T> => field.type === "select";
const isNumberField = (field: IField): field is INumberField => field.type === "number";

const memiozedSelectField = <T,>(field: IField, value: T) => ({ ...field, value: value });

const Field = memo(<T extends FieldValues>({ field, form }: { field: IField; form: UseFormReturn }) => {
  return (
    <FormField
      key={field.name}
      control={form.control}
      name={field.name as Path<T>}
      render={({ field: formField }) => (
        <FormItem key={field.name}>
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

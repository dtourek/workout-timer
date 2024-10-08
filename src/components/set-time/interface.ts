export interface INumberField {
  name: string;
  type: "number";
  value?: number;
  label: string;
  placeholder?: string;
  min: number;
  max: number;
}

export interface IObjectField {
  type: "object";
  label: string;
  name: string;
  fields: IField[];
}

interface IOption<T> {
  label: string;
  value: T;
}

export interface ISelectField<T extends number = number> {
  type: "select";
  name: string;
  value?: T;
  label: string;
  placeholder?: string;
  options: IOption<T>[];
}

export type IField<T extends number = number> = INumberField | IObjectField | ISelectField<T>;

export interface ITextField {
  name: string;
  type: "text";
  value?: string;
  label: string;
  placeholder?: string;
}

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

type ISelectValue = string | number;

interface IOption {
  label: string;
  value: ISelectValue;
}

export interface ISelectField {
  type: "select";
  name: string;
  value?: ISelectValue;
  label: string;
  placeholder?: string;
  options: IOption[];
}

export type IField = ITextField | INumberField | IObjectField | ISelectField;

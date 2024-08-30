interface INumberField {
  name: string;
  type: "number";
  value?: number;
  label: string;
  placeholder?: string;
  min: number;
  max: number;
}

export type IField = INumberField;

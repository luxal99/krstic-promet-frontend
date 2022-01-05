import { ValidatorFn } from "@angular/forms";
import { InputType, ValueType } from "../types/types";

export interface FieldConfig {
  disabled?: boolean;
  name: string;
  options?: any[];
  placeholder?: string;
  type: InputType;
  validation?: ValidatorFn[];
  value?: ValueType;
  bindValue: string;
  label?: string;
  icon?: string;
}

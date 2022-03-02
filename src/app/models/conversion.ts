import { UnitEnum } from "../enum/UnitEnum";

export interface Conversion {
  name: string;
  conversionFromValue: number;
  conversionFromUnit: UnitEnum;
  conversionToValue: number;
  conversionToUnit: UnitEnum;
}

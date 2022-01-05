import { UnitEnum } from "../enum/UnitEnum";

export interface Conversion {
  conversionFromValue: number;
  conversionFromUnit: UnitEnum;
  conversionToValue: number;
  conversionToUnit: UnitEnum;
}

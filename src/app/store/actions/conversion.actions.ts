import { Action } from "@ngrx/store";
import { Conversion } from "../../models/conversion";

export enum ConversionActionTypes {
  ADD_CONVERSION = "[CONVERSION] Add Item",
  ADD_CONVERSION_SUCCESSFULLY = "[CONVERSION] Add Item Successfully",
  DELETE_CONVERSION = "[CONVERSION] Delete Item",
  DELETE_CONVERSION_SUCCESSFULLY = "[CONVERSION] Delete Item Successfully",
  GET_CONVERSION = "[CONVERSION] Get Items",
  GET_CONVERSION_SUCCESSFULLY = "[CONVERSION] Get Items Successfully",
  UPDATE_CONVERSION = "[CONVERSION] Update Item",
  UPDATE_CONVERSION_SUCCESSFULLY = "[CONVERSION] Update Item Successfully",
}

export class AddConversionAction implements Action {
  type = ConversionActionTypes.ADD_CONVERSION;

  constructor(public payload: Conversion) {}
}

export class AddConversionSuccessfullyAction implements Action {
  type = ConversionActionTypes.ADD_CONVERSION_SUCCESSFULLY;

  constructor(public payload: Conversion) {}
}

export class DeleteConversionAction implements Action {
  type = ConversionActionTypes.DELETE_CONVERSION;

  constructor(public payload: number) {}
}

export class DeleteConversionSuccessfullyAction implements Action {
  type = ConversionActionTypes.DELETE_CONVERSION_SUCCESSFULLY;

  constructor(public payload: number) {}
}

export class GetConversionAction implements Action {
  type = ConversionActionTypes.GET_CONVERSION;
}

export class GetConversionActionSuccessfully implements Action {
  type = ConversionActionTypes.GET_CONVERSION_SUCCESSFULLY;
}

export class UpdateConversionAction implements Action {
  type = ConversionActionTypes.UPDATE_CONVERSION;

  constructor(public payload: Conversion) {}
}

export class UpdateConversionActionSuccessfully implements Action {
  type = ConversionActionTypes.UPDATE_CONVERSION_SUCCESSFULLY;

  constructor(public payload: Conversion) {}
}

export type ConversionAction =
  | AddConversionAction
  | GetConversionAction
  | GetConversionActionSuccessfully
  | AddConversionSuccessfullyAction
  | DeleteConversionAction
  | DeleteConversionSuccessfullyAction
  | UpdateConversionAction
  | UpdateConversionActionSuccessfully;

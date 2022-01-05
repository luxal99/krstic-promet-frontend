import {
  ConversionAction,
  ConversionActionTypes,
} from "../actions/conversion.actions";
import { Conversion } from "../../models/conversion";

export interface ConversionState {
  list: Conversion[];
  loading: boolean;
  error: any;
}

const initialState: ConversionState = {
  list: [],
  loading: false,
  error: undefined,
};

export function ConversionReducer(
  state: ConversionState = initialState,
  action: ConversionAction
) {
  switch (action.type) {
    case ConversionActionTypes.ADD_CONVERSION:
      return {
        ...state,
        loading: true,
      };
    case ConversionActionTypes.ADD_CONVERSION_SUCCESSFULLY:
      return {
        ...state,
        //@ts-ignore
        list: [...state.list, action.payload],
        loading: false,
      };

    case ConversionActionTypes.DELETE_CONVERSION:
      return {
        ...state,
        loading: true,
      };
    case ConversionActionTypes.DELETE_CONVERSION_SUCCESSFULLY:
      return {
        ...state,
        //@ts-ignore
        list: state.list.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case ConversionActionTypes.GET_CONVERSION:
      return {
        ...state,
        loading: true,
      };

    case ConversionActionTypes.GET_CONVERSION_SUCCESSFULLY:
      return {
        ...state,
        //@ts-ignore
        list: action.payload,
        loading: false,
      };

    case ConversionActionTypes.UPDATE_CONVERSION:
      return {
        ...state,
        loading: true,
      };
    case ConversionActionTypes.UPDATE_CONVERSION_SUCCESSFULLY:
      return {
        ...state,
        list: [
          //@ts-ignore
          ...state.list.filter((item) => item.id !== action.payload.id),
          //@ts-ignore
          action.payload,
        ],
        loading: false,
      };

    default:
      return state;
  }
}

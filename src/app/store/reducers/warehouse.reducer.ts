import {Warehouse} from "../../models/warehouse";
import {WarehouseAction, WarehouseActionTypes} from "../actions/warehouse.actions";

export interface WarehouseState {
    list: Warehouse[],
    loading: boolean,
    error: any
}

const initialState: WarehouseState = {
    list: [],
    loading: false,
    error: undefined
};


export function WarehouseReducer(state: WarehouseState = initialState, action: WarehouseAction) {
    switch (action.type) {

        case WarehouseActionTypes.ADD_WAREHOUSE:
            return {
                ...state, loading: true
            };
        case WarehouseActionTypes.ADD_WAREHOUSE_SUCCESSFULLY:
            return {
                ...state,
                //@ts-ignore
                list: [...state.list, action.payload],
                loading: false
            };

        case WarehouseActionTypes.DELETE_WAREHOUSE:
            return {
                ...state,
                loading: true
            };
        case WarehouseActionTypes.DELETE_WAREHOUSE_SUCCESSFULLY:
            return {
                ...state,
                //@ts-ignore
                list: state.list.filter((item) => item.id !== action.payload),
                loading: false
            };
        case WarehouseActionTypes.GET_WAREHOUSE:
            return {
                ...state,
                loading: true
            };

        case WarehouseActionTypes.GET_WAREHOUSE_SUCCESSFULLY:
            return {
                ...state,
                //@ts-ignore
                list: action.payload,
                loading: false
            };

        case WarehouseActionTypes.UPDATE_WAREHOUSE:
            return {
                ...state,
                loading: true
            };
        case WarehouseActionTypes.UPDATE_WAREHOUSE_SUCCESSFULLY:
            return {
                ...state,
                //@ts-ignore
                list: [...state.list.filter((item) => item.id !== action.payload.id), action.payload],
                loading: false
            };

        default:
            return state;
    }
}

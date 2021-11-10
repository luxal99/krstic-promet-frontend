import {Action} from "@ngrx/store";
import {Warehouse} from "../../models/warehouse";

export enum WarehouseActionTypes {
    ADD_WAREHOUSE = "[WAREHOUSE] Add Item",
    ADD_WAREHOUSE_SUCCESSFULLY = "[WAREHOUSE] Add Item Successfully",
    DELETE_WAREHOUSE = "[WAREHOUSE] Delete Item",
    DELETE_WAREHOUSE_SUCCESSFULLY = "[WAREHOUSE] Delete Item Successfully",
    GET_WAREHOUSE = "[WAREHOUSE] Get Items",
    GET_WAREHOUSE_SUCCESSFULLY = "[WAREHOUSE] Get Items Successfully",
    UPDATE_WAREHOUSE = "[WAREHOUSE] Update Item",
    UPDATE_WAREHOUSE_SUCCESSFULLY = "[WAREHOUSE] Update Item Successfully"

}

export class AddWarehouseAction implements Action {
    type = WarehouseActionTypes.ADD_WAREHOUSE;

    constructor(public payload: Warehouse) {
    }
}


export class AddWarehouseSuccessfullyAction implements Action {
    type = WarehouseActionTypes.ADD_WAREHOUSE_SUCCESSFULLY;

    constructor(public payload: Warehouse) {
    }
}

export class DeleteWarehouseAction implements Action {
    type = WarehouseActionTypes.DELETE_WAREHOUSE;

    constructor(public payload: number) {
    }
}

export class DeleteWarehouseSuccessfullyAction implements Action {
    type = WarehouseActionTypes.DELETE_WAREHOUSE_SUCCESSFULLY;

    constructor(public payload: number) {
    }
}


export class GetWarehouseAction implements Action {
    type = WarehouseActionTypes.GET_WAREHOUSE;

}

export class GetWarehouseActionSuccessfully implements Action {
    type = WarehouseActionTypes.GET_WAREHOUSE_SUCCESSFULLY;
}

export class UpdateWarehouseAction implements Action {
    type = WarehouseActionTypes.UPDATE_WAREHOUSE;

    constructor(public payload: Warehouse) {
    }
}

export class UpdateWarehouseActionSuccessfully implements Action {
    type = WarehouseActionTypes.UPDATE_WAREHOUSE_SUCCESSFULLY;

    constructor(public payload: Warehouse) {
    }
}

export type WarehouseAction =
    AddWarehouseAction
    | GetWarehouseAction
    | GetWarehouseActionSuccessfully
    | AddWarehouseSuccessfullyAction
    | DeleteWarehouseAction
    | DeleteWarehouseSuccessfullyAction
    | UpdateWarehouseAction
    | UpdateWarehouseActionSuccessfully

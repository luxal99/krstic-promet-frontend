import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, mergeMap} from "rxjs/operators";
import {WarehouseService} from "../../service/warehouse.service";
import {WarehouseActionTypes} from "../actions/warehouse.actions";

@Injectable()
export class WarehouseEffect {
    constructor(private actions$: Actions,
                private warehouseService: WarehouseService) {
    }

    loadWarehouse = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActionTypes.GET_WAREHOUSE),
        mergeMap(() => this.warehouseService.getAll().pipe(
            map(articleCategories => ({
                type: WarehouseActionTypes.GET_WAREHOUSE_SUCCESSFULLY,
                payload: articleCategories
            }))
        ))
    ));


    addWarehouse = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActionTypes.ADD_WAREHOUSE),
        // @ts-ignore
        mergeMap((data) => this.warehouseService.save(data.payload).pipe(
            map(warehouse => ({
                type: WarehouseActionTypes.ADD_WAREHOUSE_SUCCESSFULLY,
                payload: warehouse
            }))
        ))
    ));

    deleteWarehouse = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActionTypes.DELETE_WAREHOUSE),
        // @ts-ignore
        mergeMap((data) => this.warehouseService.delete(data.payload).pipe(
            map(() => ({
                type: WarehouseActionTypes.DELETE_WAREHOUSE_SUCCESSFULLY,
                // @ts-ignore
                payload: data.payload
            }))
        ))
    ));


    updateWarehouse = createEffect(() => this.actions$.pipe(
        ofType(WarehouseActionTypes.UPDATE_WAREHOUSE),
        // @ts-ignore
        mergeMap((data) => this.warehouseService.update(data.payload).pipe(
            map(warehouse => ({
                type: WarehouseActionTypes.UPDATE_WAREHOUSE_SUCCESSFULLY,
                payload: warehouse
            }))
        ))
    ));
}

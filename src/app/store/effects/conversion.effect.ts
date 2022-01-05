import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { ConversionActionTypes } from "../actions/conversion.actions";
import { ConversionService } from "../../service/conversion.service";

@Injectable()
export class ConversionEffect {
  constructor(
    private actions$: Actions,
    private articleService: ConversionService
  ) {}

  loadConversion = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversionActionTypes.GET_CONVERSION),
      mergeMap(() =>
        this.articleService.getAll().pipe(
          map((articleCategories) => ({
            type: ConversionActionTypes.GET_CONVERSION_SUCCESSFULLY,
            payload: articleCategories,
          }))
        )
      )
    )
  );

  addConversion = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversionActionTypes.ADD_CONVERSION),
      mergeMap((data) =>
        // @ts-ignore
        this.articleService.save(data.payload).pipe(
          map((article) => ({
            type: ConversionActionTypes.ADD_CONVERSION_SUCCESSFULLY,
            payload: article,
          }))
        )
      )
    )
  );

  deleteConversion = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversionActionTypes.DELETE_CONVERSION),
      mergeMap((data) =>
        // @ts-ignore
        this.articleService.delete(data.payload).pipe(
          map(() => ({
            type: ConversionActionTypes.DELETE_CONVERSION_SUCCESSFULLY,
            // @ts-ignore
            payload: data.payload,
          }))
        )
      )
    )
  );

  updateConversion = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversionActionTypes.UPDATE_CONVERSION),
      mergeMap((data) =>
        // @ts-ignore
        this.articleService.update(data.payload).pipe(
          map((article) => ({
            type: ConversionActionTypes.UPDATE_CONVERSION_SUCCESSFULLY,
            payload: article,
          }))
        )
      )
    )
  );
}

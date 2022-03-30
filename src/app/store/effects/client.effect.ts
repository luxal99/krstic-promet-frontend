import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { ClientService } from "../../service/client.service";
import { ClientActionTypes } from "../actions/client.actions";

@Injectable()
export class ClientEffect {
  constructor(
    private actions$: Actions,
    private articleService: ClientService
  ) {}

  loadClient = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActionTypes.GET_CLIENT),
      mergeMap((data) =>
        // @ts-ignore
        this.articleService.getAll(data.pagination).pipe(
          map((articleCategories) => ({
            type: ClientActionTypes.GET_CLIENT_SUCCESSFULLY,
            payload: articleCategories,
          }))
        )
      )
    )
  );

  addClient = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActionTypes.ADD_CLIENT),
      mergeMap((data) =>
        // @ts-ignore
        this.articleService.save(data.payload).pipe(
          map((article) => ({
            type: ClientActionTypes.ADD_CLIENT_SUCCESSFULLY,
            payload: article,
          }))
        )
      )
    )
  );

  deleteClient = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActionTypes.DELETE_CLIENT),
      // @ts-ignore
      mergeMap((data) =>
        // @ts-ignore
        this.articleService.delete(data.payload).pipe(
          map(() => ({
            type: ClientActionTypes.DELETE_CLIENT_SUCCESSFULLY,
            // @ts-ignore
            payload: data.payload,
          }))
        )
      )
    )
  );

  updateClient = createEffect(() =>
    this.actions$.pipe(
      ofType(ClientActionTypes.UPDATE_CLIENT),
      // @ts-ignore
      mergeMap((data) =>
        // @ts-ignore
        this.articleService.update(data.payload).pipe(
          map((article) => ({
            type: ClientActionTypes.UPDATE_CLIENT_SUCCESSFULLY,
            payload: article,
          }))
        )
      )
    )
  );
}

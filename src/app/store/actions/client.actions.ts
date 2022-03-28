import { Action } from "@ngrx/store";
import { Client } from "../../models/client";
import { PaginationDto } from "../../models/dto/PaginationDto";

export enum ClientActionTypes {
  ADD_CLIENT = "[CLIENT] Add Item",
  ADD_CLIENT_SUCCESSFULLY = "[CLIENT] Add Item Successfully",
  DELETE_CLIENT = "[CLIENT] Delete Item",
  DELETE_CLIENT_SUCCESSFULLY = "[CLIENT] Delete Item Successfully",
  GET_CLIENT = "[CLIENT] Get Items",
  GET_CLIENT_SUCCESSFULLY = "[CLIENT] Get Items Successfully",
  UPDATE_CLIENT = "[CLIENT] Update Item",
  UPDATE_CLIENT_SUCCESSFULLY = "[CLIENT] Update Item Successfully",
}

export class AddClientAction implements Action {
  type = ClientActionTypes.ADD_CLIENT;

  constructor(public payload: Client) {}
}

export class AddClientSuccessfullyAction implements Action {
  type = ClientActionTypes.ADD_CLIENT_SUCCESSFULLY;

  constructor(public payload: Client) {}
}

export class DeleteClientAction implements Action {
  type = ClientActionTypes.DELETE_CLIENT;

  constructor(public payload: number) {}
}

export class DeleteClientSuccessfullyAction implements Action {
  type = ClientActionTypes.DELETE_CLIENT_SUCCESSFULLY;

  constructor(public payload: number) {}
}

export class GetClientAction implements Action {
  type = ClientActionTypes.GET_CLIENT;

  constructor(public pagination: PaginationDto) {}
}

export class GetClientActionSuccessfully implements Action {
  type = ClientActionTypes.GET_CLIENT_SUCCESSFULLY;
}

export class UpdateClientAction implements Action {
  type = ClientActionTypes.UPDATE_CLIENT;

  constructor(public payload: Client) {}
}

export class UpdateClientActionSuccessfully implements Action {
  type = ClientActionTypes.UPDATE_CLIENT_SUCCESSFULLY;

  constructor(public payload: Client) {}
}

export type ClientAction =
  | AddClientAction
  | GetClientAction
  | GetClientActionSuccessfully
  | AddClientSuccessfullyAction
  | DeleteClientAction
  | DeleteClientSuccessfullyAction
  | UpdateClientAction
  | UpdateClientActionSuccessfully;

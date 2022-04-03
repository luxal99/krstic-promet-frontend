import { ClientAction, ClientActionTypes } from "../actions/client.actions";
import { Client } from "../../models/client";
import { PaginationData } from "../../models/dto/PaginationData";

export interface ClientState {
  list: Client[];
  loading: boolean;
  error: any;
  pagination: PaginationData;
}

const initialState: ClientState = {
  list: [],
  loading: false,
  error: undefined,
  pagination: { dataCount: 0 },
};

export function ClientReducer(
  state: ClientState = initialState,
  action: ClientAction
) {
  switch (action.type) {
    case ClientActionTypes.ADD_CLIENT:
      return {
        ...state,
        loading: true,
      };
    case ClientActionTypes.ADD_CLIENT_SUCCESSFULLY:
      return {
        ...state,
        //@ts-ignore
        list: [...state.list, action.payload],
        loading: false,
      };

    case ClientActionTypes.DELETE_CLIENT:
      return {
        ...state,
        loading: true,
      };
    case ClientActionTypes.DELETE_CLIENT_SUCCESSFULLY:
      return {
        ...state,
        //@ts-ignore
        list: state.list.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case ClientActionTypes.GET_CLIENT:
      return {
        ...state,
        loading: true,
      };

    case ClientActionTypes.GET_CLIENT_SUCCESSFULLY:
      //@ts-ignore
      console.log(action.pagination);
      return {
        ...state,
        //@ts-ignore
        list: action.payload,
        loading: false,
        //@ts-ignore
        pagination: action.pagination,
      };

    case ClientActionTypes.UPDATE_CLIENT:
      return {
        ...state,
        loading: true,
      };
    case ClientActionTypes.UPDATE_CLIENT_SUCCESSFULLY:
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

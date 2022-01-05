import { ArticleAction, ArticleActionTypes } from "../actions/article.actions";
import { Article } from "../../models/article";

export interface ArticleState {
  list: Article[];
  loading: boolean;
  error: any;
}

const initialState: ArticleState = {
  list: [],
  loading: false,
  error: undefined,
};

export function ArticleReducer(
  state: ArticleState = initialState,
  action: ArticleAction
) {
  switch (action.type) {
    case ArticleActionTypes.ADD_ARTICLE:
      return {
        ...state,
        loading: true,
      };
    case ArticleActionTypes.ADD_ARTICLE_SUCCESSFULLY:
      return {
        ...state,
        //@ts-ignore
        list: [...state.list, action.payload],
        loading: false,
      };

    case ArticleActionTypes.DELETE_ARTICLE:
      return {
        ...state,
        loading: true,
      };
    case ArticleActionTypes.DELETE_ARTICLE_SUCCESSFULLY:
      return {
        ...state,
        //@ts-ignore
        list: state.list.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case ArticleActionTypes.GET_ARTICLE:
      return {
        ...state,
        loading: true,
      };

    case ArticleActionTypes.GET_ARTICLE_SUCCESSFULLY:
      return {
        ...state,
        //@ts-ignore
        list: action.payload,
        loading: false,
      };

    case ArticleActionTypes.UPDATE_ARTICLE:
      return {
        ...state,
        loading: true,
      };
    case ArticleActionTypes.UPDATE_ARTICLE_SUCCESSFULLY:
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

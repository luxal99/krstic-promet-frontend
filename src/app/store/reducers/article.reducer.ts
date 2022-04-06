import { ArticleAction, ArticleActionTypes } from "../actions/article.actions";
import { Article } from "../../models/article";
import { PaginationData } from "../../models/dto/PaginationData";

export interface ArticleState {
  list: Article[];
  pagination: PaginationData;
  loading: boolean;
  error: any;
}

const initialState: ArticleState = {
  list: [],
  loading: false,
  error: undefined,
  pagination: { dataCount: 0 },
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
        pagination: { dataCount: state.pagination.dataCount + 1 },
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
        //@ts-ignore
        pagination: action.pagination,
        loading: false,
      };

    case ArticleActionTypes.GET_ARTICLE_BY_WAREHOUSE:
      return {
        ...state,
        loading: true,
      };

    case ArticleActionTypes.GET_ARTICLE_BY_WAREHOUSE_SUCCESSFULLY:
      return {
        ...state,
        //@ts-ignore
        list: action.payload,
        //@ts-ignore
        pagination: action.pagination,
        loading: false,
      };

    case ArticleActionTypes.GET_ARTICLE_BY_ARTICLE_SUB_CATEGORY:
      return {
        ...state,
        loading: true,
      };

    case ArticleActionTypes.GET_ARTICLE_BY_ARTICLE_SUB_CATEGORY_SUCCESSFULLY:
      return {
        ...state,
        //@ts-ignore
        list: action.payload,
        //@ts-ignore
        pagination: action.pagination,
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

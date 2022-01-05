import { ArticleSubCategory } from "../../models/article-sub-category";
import {
  ArticleSubCategoryAction,
  ArticleSubCategoryActionTypes,
} from "../actions/article-sub-category.actions";
import { ArticleCategoryActionTypes } from "../actions/article-category.actions";

export interface ArticleSubCategoryState {
  list: ArticleSubCategory[];
  loading: boolean;
  error: any;
}

const initialState: ArticleSubCategoryState = {
  list: [],
  loading: false,
  error: undefined,
};

export function ArticleSubCategoryReducer(
  state: ArticleSubCategoryState = initialState,
  action: ArticleSubCategoryAction
) {
  //@ts-ignore
  switch (action.type) {
    case ArticleSubCategoryActionTypes.ADD_ARTICLE_SUB_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case ArticleSubCategoryActionTypes.ADD_ARTICLE_SUB_CATEGORY_SUCCESSFULLY:
      return {
        ...state,
        //@ts-ignore
        list: [...state.list, action.payload],
        loading: false,
      };

    case ArticleSubCategoryActionTypes.DELETE_ARTICLE_SUB_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case ArticleSubCategoryActionTypes.DELETE_ARTICLE_SUB_CATEGORY_SUCCESSFULLY:
      return {
        ...state,
        //@ts-ignore
        list: state.list.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case ArticleSubCategoryActionTypes.GET_ARTICLE_SUB_CATEGORY:
      return {
        ...state,
        loading: true,
      };

    case ArticleSubCategoryActionTypes.GET_ARTICLE_SUB_CATEGORY_SUCCESSFULLY:
      return {
        ...state,
        //@ts-ignore
        list: action.payload,
        loading: false,
      };
    case ArticleSubCategoryActionTypes.UPDATE_ARTICLE_SUB_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case ArticleSubCategoryActionTypes.UPDATE_ARTICLE_SUB_CATEGORY_SUCCESSFULLY:
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

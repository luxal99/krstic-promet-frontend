import {AddArticleCategoryAction, ArticleCategoryActionTypes} from "../actions/article-category.actions";
import {ArticleCategory} from "../../models/article-category";

export interface ArticleCategoryState {
    list: ArticleCategory[],
    loading: boolean,
    error: any
}

const initialState: ArticleCategoryState = {
    list: [],
    loading: false,
    error: undefined
};


export function ArticleCategoryReducer(state: ArticleCategoryState = initialState, action: AddArticleCategoryAction) {
    switch (action.type) {

        case ArticleCategoryActionTypes.ADD_ARTICLE_CATEGORY:
            return {
                ...state, loading: true
            };
        case ArticleCategoryActionTypes.ADD_ARTICLE_CATEGORY_SUCCESSFULLY:
            return {
                ...state,
                list: [...state.list, action.payload],
                loading: false
            };

        case ArticleCategoryActionTypes.DELETE_ARTICLE_CATEGORY:
            return {
                ...state,
                loading: true
            };
        case ArticleCategoryActionTypes.DELETE_ARTICLE_CATEGORY_SUCCESSFULLY:
            return {
                ...state,
                list: state.list.filter((item) => item.id !== action.payload),
                loading: false
            };
        case ArticleCategoryActionTypes.GET_ARTICLE_CATEGORY:
            return {
                ...state,
                loading: true
            };

        case ArticleCategoryActionTypes.LOAD_ARTICLE_CATEGORY:
            return {
                ...state,
                list: action.payload,
                loading: false
            };


        default:
            return state;
    }
}

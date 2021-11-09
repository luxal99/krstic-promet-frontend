import {AddArticleCategoryAction, ArticleCategoryActionTypes} from "../actions/real-estate-category.actions";
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

import {Action} from "@ngrx/store";
import {ArticleCategory} from "../../models/article-category";

export enum ArticleCategoryActionTypes {
    ADD_ARTICLE_CATEGORY = "[ARTICLE_CATEGORY] Add Item",
    GET_ARTICLE_CATEGORY = "[ARTICLE_CATEGORY] Get Item",
    LOAD_ARTICLE_CATEGORY = "[ARTICLE_CATEGORY] Load Item",
}

export class AddArticleCategoryAction implements Action {
    type = ArticleCategoryActionTypes.ADD_ARTICLE_CATEGORY;

    constructor(public payload: ArticleCategory) {
    }
}

export class GetArticleCategoryAction implements Action {
    type = ArticleCategoryActionTypes.GET_ARTICLE_CATEGORY;

}

export class LoadArticleCategoryAction implements Action {
    type = ArticleCategoryActionTypes.LOAD_ARTICLE_CATEGORY;
}


export type ArticleCategoryAction =
    AddArticleCategoryAction
    | GetArticleCategoryAction
    | LoadArticleCategoryAction

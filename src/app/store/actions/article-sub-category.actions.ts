import {Action} from "@ngrx/store";
import {ArticleCategory} from "../../models/article-category";

export enum ArticleSubCategoryActionTypes {
    ADD_ARTICLE_SUB_CATEGORY = "[ARTICLE_SUB_CATEGORY] Add Item",
    ADD_ARTICLE_SUB_CATEGORY_SUCCESSFULLY = "[ARTICLE_SUB_CATEGORY] Add Item Successfully",
    DELETE_ARTICLE_SUB_CATEGORY = "[ARTICLE_SUB_CATEGORY] Delete Item",
    DELETE_ARTICLE_SUB_CATEGORY_SUCCESSFULLY = "[ARTICLE_SUB_CATEGORY] Delete Item Successfully",
    GET_ARTICLE_SUB_CATEGORY = "[ARTICLE_SUB_CATEGORY] Get ItemS",
    GET_ARTICLE_SUB_CATEGORY_SUCCESSFULLY = "[ARTICLE_SUB_CATEGORY] Get Items Successfully",
}

export class AddArticleSubCategoryAction implements Action {
    type = ArticleSubCategoryActionTypes.ADD_ARTICLE_SUB_CATEGORY;

    constructor(public payload: ArticleCategory) {
    }
}


export class AddArticleSubCategorySuccessfullyAction implements Action {
    type = ArticleSubCategoryActionTypes.ADD_ARTICLE_SUB_CATEGORY_SUCCESSFULLY;

    constructor(public payload: ArticleCategory) {
    }
}

export class DeleteArticleSubCategoryAction implements Action {
    type = ArticleSubCategoryActionTypes.DELETE_ARTICLE_SUB_CATEGORY;

    constructor(public payload: number) {
    }
}

export class DeleteArticleSubCategorySuccessfullyAction implements Action {
    type = ArticleSubCategoryActionTypes.DELETE_ARTICLE_SUB_CATEGORY_SUCCESSFULLY;

    constructor(public payload: number) {
    }
}


export class GetArticleSubCategoryAction implements Action {
    type = ArticleSubCategoryActionTypes.GET_ARTICLE_SUB_CATEGORY;

}

export class GetArticleSubCategoryActionSuccessfully implements Action {
    type = ArticleSubCategoryActionTypes.GET_ARTICLE_SUB_CATEGORY_SUCCESSFULLY;
}


export type ArticleSubCategoryAction =
    ArticleSubCategoryActionTypes
    | GetArticleSubCategoryAction
    | GetArticleSubCategoryActionSuccessfully
    | AddArticleSubCategorySuccessfullyAction
    | DeleteArticleSubCategoryAction
    | DeleteArticleSubCategorySuccessfullyAction

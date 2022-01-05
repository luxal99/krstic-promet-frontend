import { Action } from "@ngrx/store";
import { ArticleCategory } from "../../models/article-category";

export enum ArticleCategoryActionTypes {
  ADD_ARTICLE_CATEGORY = "[ARTICLE_CATEGORY] Add Item",
  ADD_ARTICLE_CATEGORY_SUCCESSFULLY = "[ARTICLE_CATEGORY] Add Item Successfully",
  DELETE_ARTICLE_CATEGORY = "[ARTICLE_CATEGORY] Delete Item",
  DELETE_ARTICLE_CATEGORY_SUCCESSFULLY = "[ARTICLE_CATEGORY] Delete Item Successfully",
  GET_ARTICLE_CATEGORY = "[ARTICLE_CATEGORY] Get Items",
  GET_ARTICLE_CATEGORY_SUCCESSFULLY = "[ARTICLE_CATEGORY] Get Items Successfully",
  UPDATE_ARTICLE_CATEGORY = "[ARTICLE_CATEGORY] Update Item",
  UPDATE_ARTICLE_CATEGORY_SUCCESSFULLY = "[ARTICLE_CATEGORY] Update Item Successfully",
}

export class AddArticleCategoryAction implements Action {
  type = ArticleCategoryActionTypes.ADD_ARTICLE_CATEGORY;

  constructor(public payload: ArticleCategory) {}
}

export class AddArticleCategorySuccessfullyAction implements Action {
  type = ArticleCategoryActionTypes.ADD_ARTICLE_CATEGORY_SUCCESSFULLY;

  constructor(public payload: ArticleCategory) {}
}

export class DeleteArticleCategoryAction implements Action {
  type = ArticleCategoryActionTypes.DELETE_ARTICLE_CATEGORY;

  constructor(public payload: number) {}
}

export class DeleteArticleCategorySuccessfullyAction implements Action {
  type = ArticleCategoryActionTypes.DELETE_ARTICLE_CATEGORY_SUCCESSFULLY;

  constructor(public payload: number) {}
}

export class GetArticleCategoryAction implements Action {
  type = ArticleCategoryActionTypes.GET_ARTICLE_CATEGORY;
}

export class GetArticleCategoryActionSuccessfully implements Action {
  type = ArticleCategoryActionTypes.GET_ARTICLE_CATEGORY_SUCCESSFULLY;
}

export class UpdateArticleCategoryAction implements Action {
  type = ArticleCategoryActionTypes.UPDATE_ARTICLE_CATEGORY;

  constructor(public payload: ArticleCategory) {}
}

export class UpdateArticleCategoryActionSuccessfully implements Action {
  type = ArticleCategoryActionTypes.UPDATE_ARTICLE_CATEGORY_SUCCESSFULLY;

  constructor(public payload: ArticleCategory) {}
}

export type ArticleCategoryAction =
  | AddArticleCategoryAction
  | GetArticleCategoryAction
  | GetArticleCategoryActionSuccessfully
  | AddArticleCategorySuccessfullyAction
  | DeleteArticleCategoryAction
  | DeleteArticleCategorySuccessfullyAction
  | UpdateArticleCategoryAction
  | UpdateArticleCategoryActionSuccessfully;

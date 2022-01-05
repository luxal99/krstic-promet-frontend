import { Action } from "@ngrx/store";
import { Article } from "../../models/article";

export enum ArticleActionTypes {
  ADD_ARTICLE = "[ARTICLE] Add Item",
  ADD_ARTICLE_SUCCESSFULLY = "[ARTICLE] Add Item Successfully",
  DELETE_ARTICLE = "[ARTICLE] Delete Item",
  DELETE_ARTICLE_SUCCESSFULLY = "[ARTICLE] Delete Item Successfully",
  GET_ARTICLE = "[ARTICLE] Get Items",
  GET_ARTICLE_SUCCESSFULLY = "[ARTICLE] Get Items Successfully",
  UPDATE_ARTICLE = "[ARTICLE] Update Item",
  UPDATE_ARTICLE_SUCCESSFULLY = "[ARTICLE] Update Item Successfully",
}

export class AddArticleAction implements Action {
  type = ArticleActionTypes.ADD_ARTICLE;

  constructor(public payload: Article) {}
}

export class AddArticleSuccessfullyAction implements Action {
  type = ArticleActionTypes.ADD_ARTICLE_SUCCESSFULLY;

  constructor(public payload: Article) {}
}

export class DeleteArticleAction implements Action {
  type = ArticleActionTypes.DELETE_ARTICLE;

  constructor(public payload: number) {}
}

export class DeleteArticleSuccessfullyAction implements Action {
  type = ArticleActionTypes.DELETE_ARTICLE_SUCCESSFULLY;

  constructor(public payload: number) {}
}

export class GetArticleAction implements Action {
  type = ArticleActionTypes.GET_ARTICLE;
}

export class GetArticleActionSuccessfully implements Action {
  type = ArticleActionTypes.GET_ARTICLE_SUCCESSFULLY;
}

export class UpdateArticleAction implements Action {
  type = ArticleActionTypes.UPDATE_ARTICLE;

  constructor(public payload: Article) {}
}

export class UpdateArticleActionSuccessfully implements Action {
  type = ArticleActionTypes.UPDATE_ARTICLE_SUCCESSFULLY;

  constructor(public payload: Article) {}
}

export type ArticleAction =
  | AddArticleAction
  | GetArticleAction
  | GetArticleActionSuccessfully
  | AddArticleSuccessfullyAction
  | DeleteArticleAction
  | DeleteArticleSuccessfullyAction
  | UpdateArticleAction
  | UpdateArticleActionSuccessfully;

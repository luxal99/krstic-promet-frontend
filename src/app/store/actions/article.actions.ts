import { Action } from "@ngrx/store";
import { Article } from "../../models/article";
import { PaginationDto } from "../../models/dto/PaginationDto";

export enum ArticleActionTypes {
  ADD_ARTICLE = "[ARTICLE] Add Item",
  ADD_ARTICLE_SUCCESSFULLY = "[ARTICLE] Add Item Successfully",
  DELETE_ARTICLE = "[ARTICLE] Delete Item",
  DELETE_ARTICLE_SUCCESSFULLY = "[ARTICLE] Delete Item Successfully",
  GET_ARTICLE = "[ARTICLE] Get Items",
  GET_ARTICLE_SUCCESSFULLY = "[ARTICLE] Get Items Successfully",
  GET_ARTICLE_BY_WAREHOUSE = "[ARTICLE] Get Items By Warehouse",
  GET_ARTICLE_BY_WAREHOUSE_SUCCESSFULLY = "[ARTICLE] Get Items By Warehouse Successfully",
  GET_ARTICLE_BY_ARTICLE_SUB_CATEGORY = "[ARTICLE] Get Items By Article Sub Category",
  GET_ARTICLE_BY_ARTICLE_SUB_CATEGORY_SUCCESSFULLY = "[ARTICLE] Get Items By Article Sub Category Successfully",
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

  constructor(public pagination: PaginationDto) {}
}

export class GetArticleActionSuccessfully implements Action {
  type = ArticleActionTypes.GET_ARTICLE_SUCCESSFULLY;

  constructor(public pagination: PaginationDto) {}
}

export class GetArticleByWarehouse implements Action {
  type = ArticleActionTypes.GET_ARTICLE_BY_WAREHOUSE;
}

export class GetArticleByWarehouseSuccessfully implements Action {
  type = ArticleActionTypes.GET_ARTICLE_BY_WAREHOUSE_SUCCESSFULLY;

  constructor(public pagination: PaginationDto) {}
}

export class GetArticleByArticleSubCategory implements Action {
  type = ArticleActionTypes.GET_ARTICLE_BY_ARTICLE_SUB_CATEGORY;
}

export class GetArticleByArticleSubCategorySuccessfully implements Action {
  type = ArticleActionTypes.GET_ARTICLE_BY_ARTICLE_SUB_CATEGORY_SUCCESSFULLY;

  constructor(public pagination: PaginationDto) {}
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
  | GetArticleByWarehouse
  | GetArticleByWarehouseSuccessfully
  | GetArticleByArticleSubCategory
  | GetArticleByArticleSubCategorySuccessfully
  | AddArticleSuccessfullyAction
  | DeleteArticleAction
  | DeleteArticleSuccessfullyAction
  | UpdateArticleAction
  | UpdateArticleActionSuccessfully;

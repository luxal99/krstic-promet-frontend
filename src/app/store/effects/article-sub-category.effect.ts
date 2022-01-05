import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { ArticleSubCategoryService } from "../../service/article-sub-category.service";
import { ArticleSubCategoryActionTypes } from "../actions/article-sub-category.actions";

@Injectable()
export class ArticleSubCategoryEffect {
  constructor(
    private actions$: Actions,
    private articleSubCategoryService: ArticleSubCategoryService
  ) {}

  loadArticleSubCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleSubCategoryActionTypes.GET_ARTICLE_SUB_CATEGORY),
      mergeMap(() =>
        this.articleSubCategoryService.getAll().pipe(
          map((articleSubCategories) => ({
            type: ArticleSubCategoryActionTypes.GET_ARTICLE_SUB_CATEGORY_SUCCESSFULLY,
            payload: articleSubCategories,
          }))
        )
      )
    )
  );

  addArticleSubCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleSubCategoryActionTypes.ADD_ARTICLE_SUB_CATEGORY),
      mergeMap((data) =>
        // @ts-ignore
        this.articleSubCategoryService.save(data.payload).pipe(
          map((articleSubCategories) => ({
            type: ArticleSubCategoryActionTypes.ADD_ARTICLE_SUB_CATEGORY_SUCCESSFULLY,
            payload: articleSubCategories,
          }))
        )
      )
    )
  );

  deleteArticleSubCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleSubCategoryActionTypes.DELETE_ARTICLE_SUB_CATEGORY),
      mergeMap((data) =>
        // @ts-ignore
        this.articleSubCategoryService.delete(data.payload).pipe(
          map(() => ({
            type: ArticleSubCategoryActionTypes.DELETE_ARTICLE_SUB_CATEGORY_SUCCESSFULLY,
            // @ts-ignore
            payload: data.payload,
          }))
        )
      )
    )
  );

  updateArticleSubCategory = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleSubCategoryActionTypes.UPDATE_ARTICLE_SUB_CATEGORY),
      mergeMap((data) =>
        // @ts-ignore
        this.articleSubCategoryService.update(data.payload).pipe(
          map((articleSubCategory) => ({
            type: ArticleSubCategoryActionTypes.UPDATE_ARTICLE_SUB_CATEGORY_SUCCESSFULLY,
            payload: articleSubCategory,
          }))
        )
      )
    )
  );
}

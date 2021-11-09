import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, mergeMap} from "rxjs/operators";
import {ArticleCategoryService} from "../../service/article-category.service";
import {ArticleCategoryActionTypes} from "../actions/article-category.actions";

@Injectable()
export class ArticleCategoryEffect {
    constructor(private actions$: Actions,
                private articleCategoryService: ArticleCategoryService) {
    }

    loadArticleCategory = createEffect(() => this.actions$.pipe(
        ofType(ArticleCategoryActionTypes.GET_ARTICLE_CATEGORY),
        mergeMap(() => this.articleCategoryService.getAll().pipe(
            map(articleCategories => ({
                type: ArticleCategoryActionTypes.LOAD_ARTICLE_CATEGORY,
                payload: articleCategories
            }))
        ))
    ));


    addArticleCategory = createEffect(() => this.actions$.pipe(
        ofType(ArticleCategoryActionTypes.ADD_ARTICLE_CATEGORY),
        // @ts-ignore
        mergeMap((data) => this.articleCategoryService.save(data.payload).pipe(
            map(articleCategory => ({
                type: ArticleCategoryActionTypes.ADD_ARTICLE_CATEGORY_SUCCESSFULLY,
                payload: articleCategory
            }))
        ))
    ));

    deleteArticleCategory = createEffect(() => this.actions$.pipe(
        ofType(ArticleCategoryActionTypes.DELETE_ARTICLE_CATEGORY),
        // @ts-ignore
        mergeMap((data) => this.articleCategoryService.delete(data.payload).pipe(
            map(articleCategory => ({
                type: ArticleCategoryActionTypes.DELETE_ARTICLE_CATEGORY_SUCCESSFULLY,
                // @ts-ignore
                payload: data.payload
            }))
        ))
    ));

}

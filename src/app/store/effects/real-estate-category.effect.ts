import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, mergeMap} from "rxjs/operators";
import {ArticleCategoryService} from "../../service/article-category.service";
import {ArticleCategoryActionTypes} from "../actions/real-estate-category.actions";

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

}

import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, mergeMap} from "rxjs/operators";
import {ArticleService} from "../../service/article.service";
import {ArticleActionTypes} from "../actions/article.actions";

@Injectable()
export class ArticleEffect {
    constructor(private actions$: Actions,
                private articleService: ArticleService) {
    }

    loadArticle = createEffect(() => this.actions$.pipe(
        ofType(ArticleActionTypes.GET_ARTICLE),
        mergeMap(() => this.articleService.getAll().pipe(
            map(articleCategories => ({
                type: ArticleActionTypes.GET_ARTICLE_SUCCESSFULLY,
                payload: articleCategories
            }))
        ))
    ));


    addArticle = createEffect(() => this.actions$.pipe(
        ofType(ArticleActionTypes.ADD_ARTICLE),
        // @ts-ignore
        mergeMap((data) => this.articleService.save(data.payload).pipe(
            map(article => ({
                type: ArticleActionTypes.ADD_ARTICLE_SUCCESSFULLY,
                payload: article
            }))
        ))
    ));

    deleteArticle = createEffect(() => this.actions$.pipe(
        ofType(ArticleActionTypes.DELETE_ARTICLE),
        // @ts-ignore
        mergeMap((data) => this.articleService.delete(data.payload).pipe(
            map(() => ({
                type: ArticleActionTypes.DELETE_ARTICLE_SUCCESSFULLY,
                // @ts-ignore
                payload: data.payload
            }))
        ))
    ));


    updateArticle = createEffect(() => this.actions$.pipe(
        ofType(ArticleActionTypes.UPDATE_ARTICLE),
        // @ts-ignore
        mergeMap((data) => this.articleService.update(data.payload).pipe(
            map(article => ({
                type: ArticleActionTypes.UPDATE_ARTICLE_SUCCESSFULLY,
                payload: article
            }))
        ))
    ));
}

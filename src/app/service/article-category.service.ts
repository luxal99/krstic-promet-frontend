import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {ArticleCategory} from "../models/article-category";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ArticleCategoryService extends GenericService<ArticleCategory> {

    constructor(http: HttpClient) {
        super(http, "/article-category/");
    }
}

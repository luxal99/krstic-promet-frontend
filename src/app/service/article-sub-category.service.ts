import {Injectable} from "@angular/core";
import {GenericService} from "./generic.service";
import {ArticleSubCategory} from "../models/article-sub-category";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ArticleSubCategoryService extends GenericService<ArticleSubCategory> {

    constructor(http: HttpClient) {
        super(http, "/article-sub-category/");
    }
}

import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Article } from "../models/article";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaginationDto } from "../models/dto/PaginationDto";
import { ArticleQueryDto } from "../models/dto/ArticleQueryDto";

@Injectable({
  providedIn: "root",
})
export class ArticleService extends GenericService<Article> {
  constructor(http: HttpClient) {
    super(http, "/article/");
  }

  getAllArticles(q: string): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(this.route, {
      params: { q },
      responseType: "json",
      observe: "response",
    });
  }
}

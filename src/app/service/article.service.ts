import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Article } from "../models/article";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaginationDto } from "../models/dto/PaginationDto";

@Injectable({
  providedIn: "root",
})
export class ArticleService extends GenericService<Article> {
  constructor(http: HttpClient) {
    super(http, "/article/");
  }

  getAllArticles(pagination: PaginationDto): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(this.route, {
      params: { q: JSON.stringify({ pagination }) },
      responseType: "json",
      observe: "response",
    });
  }

  searchForRealEstate(searchText: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.route + "search", {
      params: { search: encodeURI(searchText) },
    });
  }

  getArticlesByWarehouse(
    idWarehouse: number,
    pagination: PaginationDto
  ): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(
      this.route + "warehouse/" + idWarehouse,
      {
        params: { q: JSON.stringify({ pagination }) },
        observe: "response",
      }
    );
  }

  getArticlesByArticleSubCategory(
    idArticleSubCategory: number,
    pagination: PaginationDto
  ): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(
      this.route + "article-sub-category/" + idArticleSubCategory,
      {
        params: { q: JSON.stringify({ pagination }) },
        observe: "response",
      }
    );
  }
}

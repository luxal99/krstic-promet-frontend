import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Article } from "../models/article";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ArticleService extends GenericService<Article> {
  constructor(http: HttpClient) {
    super(http, "/article/");
  }

  searchForRealEstate(searchText: string): Observable<Article[]> {
    return this.http.get<Article[]>(this.route + "search", {
      params: { search: encodeURI(searchText) },
    });
  }
}

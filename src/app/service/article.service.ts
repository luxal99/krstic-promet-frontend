import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Article } from "../models/article";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ArticleService extends GenericService<Article> {
  constructor(http: HttpClient) {
    super(http, "/article/");
  }
}

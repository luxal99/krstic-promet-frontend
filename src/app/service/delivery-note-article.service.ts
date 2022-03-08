import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { DeliveryNoteArticle } from "../models/delivery-note-article";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DeliveryNoteArticleService extends GenericService<DeliveryNoteArticle> {
  constructor(http: HttpClient) {
    super(http, "/delivery-note-article/");
  }
}

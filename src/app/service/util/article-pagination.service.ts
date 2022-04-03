import { Injectable } from "@angular/core";
import { GenericPaginationService } from "./generic-pagination.service";

@Injectable({
  providedIn: "root",
})
export class ArticlePaginationService extends GenericPaginationService {
  constructor() {
    super();
  }
}

import { Injectable } from "@angular/core";
import { GenericPaginationService } from "./generic-pagination.service";

@Injectable({
  providedIn: "root",
})
export class ClientPaginationService extends GenericPaginationService {
  constructor() {
    super();
  }
}

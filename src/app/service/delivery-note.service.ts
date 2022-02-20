import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { DeliveryNote } from "../models/delivery-note";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DeliveryNoteService extends GenericService<DeliveryNote> {
  constructor(http: HttpClient) {
    super(http, "/delivery-note/");
  }

  getDeliveryNoteByQuery(q: string): Observable<HttpResponse<DeliveryNote[]>> {
    return this.http.get<DeliveryNote[]>(this.route, {
      params: { q },
      observe: "response",
      responseType: "json",
    });
  }
}

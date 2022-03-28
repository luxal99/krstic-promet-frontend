import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Client } from "../models/client";
import { HttpClient } from "@angular/common/http";
import { DeliveryNote } from "../models/delivery-note";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ClientService extends GenericService<Client> {
  constructor(http: HttpClient) {
    super(http, "/client/");
  }

  findDeliveryNotesByClientId(id: number): Observable<DeliveryNote[]> {
    return this.http.get<DeliveryNote[]>(this.route + "delivery-notes/" + id);
  }

  getAll(q: string): Observable<Client[]> {
    return this.http.get<Client[]>(this.route, {
      params: { q },
    });
  }

  searchClient(searchText: string): Observable<Client[]> {
    return this.http.get<Client[]>(this.route + "search", {
      params: { search: searchText },
    });
  }
}

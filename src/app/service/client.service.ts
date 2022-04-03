import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Client } from "../models/client";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { PaginationDto } from "../models/dto/PaginationDto";
import { TotalClientDebt } from "../models/dto/TotalClientDebt";
import { TotalClientPaid } from "../models/dto/TotalClientPaid";
import { ClientQueryDto } from "../models/dto/ClientQueryDto";

@Injectable({
  providedIn: "root",
})
export class ClientService extends GenericService<Client> {
  constructor(http: HttpClient) {
    super(http, "/client/");
  }

  findDeliveryNotesByClientId(
    id: number,
    clientQueryDto: ClientQueryDto
  ): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(
      this.route + "delivery-notes/" + id,
      {
        params: { q: encodeURI(JSON.stringify(clientQueryDto)) },
        observe: "response",
        responseType: "json",
      }
    );
  }

  getAllWithPagination(q: PaginationDto): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(this.route, {
      params: { q: JSON.stringify({ pagination: q }) },
      responseType: "json",
      observe: "response",
    });
  }

  searchClient(searchText: string): Observable<Client[]> {
    return this.http.get<Client[]>(this.route + "search", {
      params: { search: searchText },
    });
  }

  getTotalDebtForClient(id: number): Observable<TotalClientDebt> {
    return this.http.get<TotalClientDebt>(this.route + id + "/debt");
  }

  getTotalPaidForClient(id: number): Observable<TotalClientPaid> {
    return this.http.get<TotalClientPaid>(this.route + id + "/paid");
  }
}

import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Client } from "../models/client";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ClientService extends GenericService<Client> {
  constructor(http: HttpClient) {
    super(http, "/client/");
  }
}

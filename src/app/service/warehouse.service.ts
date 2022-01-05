import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Warehouse } from "../models/warehouse";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class WarehouseService extends GenericService<Warehouse> {
  constructor(http: HttpClient) {
    super(http, "/warehouse/");
  }
}

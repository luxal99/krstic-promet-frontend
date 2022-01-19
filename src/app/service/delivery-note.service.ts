import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { HttpClient } from "@angular/common/http";
import { DeliveryNote } from "../models/delivery-note";

@Injectable({
  providedIn: "root",
})
export class DeliveryNoteService extends GenericService<DeliveryNote> {
  constructor(http: HttpClient) {
    super(http, "/delivery-note/");
  }
}

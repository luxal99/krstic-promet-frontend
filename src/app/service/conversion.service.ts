import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { Conversion } from "../models/conversion";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ConversionService extends GenericService<Conversion> {
  constructor(http: HttpClient) {
    super(http, "/conversion/");
  }
}

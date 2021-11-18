import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Warehouse} from "../../models/warehouse";

@Injectable({
  providedIn: 'root'
})
export class WarehouseBehaviorService {

  private idWarehouse = new BehaviorSubject(0);

  constructor() {
  }

  add(idWarehouse: number) {
    this.idWarehouse.next(idWarehouse);
  }

  get(): number {
    return this.idWarehouse.value;
  }

}

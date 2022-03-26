import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BehaviorFilterModel } from "./model/BehaviorFilterModel";

@Injectable({
  providedIn: "root",
})
export class BehaviorService {
  private behaviorSubject = new BehaviorSubject<BehaviorFilterModel>({
    id: 0,
    filterType: null,
  });
  private _updateDeliveryNotes = new BehaviorSubject(false);

  constructor() {}

  add(model: BehaviorFilterModel) {
    this.behaviorSubject.next(model);
  }

  get updateDeliveryNotes(): BehaviorSubject<boolean> {
    return this._updateDeliveryNotes;
  }

  get(): BehaviorFilterModel {
    return this.behaviorSubject.value;
  }

  reset() {
    this.behaviorSubject.next({ id: 0, filterType: null });
  }

  setValueForUpdateDeliveryNoteBehaviorSubject(value: boolean): void {
    this._updateDeliveryNotes.next(value);
  }

  getUpdateDeliveryNoteBSValue(): boolean {
    return this._updateDeliveryNotes.value;
  }
}

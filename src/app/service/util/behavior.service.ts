import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BehaviorService {
  private behaviorSubject = new BehaviorSubject(0);
  private _updateDeliveryNotes = new BehaviorSubject(false);

  constructor() {}

  add(id: number) {
    this.behaviorSubject.next(id);
  }

  get updateDeliveryNotes(): BehaviorSubject<boolean> {
    return this._updateDeliveryNotes;
  }

  get(): number {
    return this.behaviorSubject.value;
  }

  reset() {
    this.behaviorSubject.next(0);
  }

  setValueForUpdateDeliveryNoteBehaviorSubject(value: boolean): void {
    this._updateDeliveryNotes.next(value);
  }

  getUpdateDeliveryNoteBSValue(): boolean {
    return this._updateDeliveryNotes.value;
  }
}

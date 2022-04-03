import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PaginationData } from "../../models/dto/PaginationData";

@Injectable({
  providedIn: "root",
})
export class GenericPaginationService {
  private readonly _paginationData!: BehaviorSubject<PaginationData>;

  constructor() {
    this._paginationData = new BehaviorSubject<PaginationData>({
      dataCount: 0,
    });
  }

  get paginationData(): BehaviorSubject<PaginationData> {
    return this._paginationData;
  }

  getPaginationDataCurrentValue(): PaginationData {
    return this.paginationData.value;
  }

  addPaginationData(paginationData: PaginationData): void {
    this.paginationData.next(paginationData);
  }
}

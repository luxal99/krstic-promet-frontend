import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: "root"
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

    reset() {
        this.idWarehouse.next(0);
    }
}

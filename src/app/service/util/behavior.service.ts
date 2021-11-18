import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class BehaviorService {

    private behaviorSubject = new BehaviorSubject(0);

    constructor() {
    }

    add(id: number) {
        this.behaviorSubject.next(id);
    }

    get(): number {
        return this.behaviorSubject.value;
    }

    reset() {
        this.behaviorSubject.next(0);
    }
}

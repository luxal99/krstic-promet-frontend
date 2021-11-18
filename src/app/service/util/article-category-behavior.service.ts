import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {BehaviorService} from "./behavior.service";

@Injectable({
    providedIn: "root"
})
export class ArticleCategoryBehaviorService extends BehaviorService{

    constructor() {
        super();
    }
}

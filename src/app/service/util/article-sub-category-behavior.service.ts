import { Injectable } from '@angular/core';
import {BehaviorService} from "./behavior.service";

@Injectable({
  providedIn: 'root'
})
export class ArticleSubCategoryBehaviorService extends BehaviorService{
  constructor() {
    super();
  }
}

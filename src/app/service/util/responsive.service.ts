import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ResponsiveService {
  isMobile = new BehaviorSubject(window.screen.width <= 700);

  constructor() {}

  getIsMobileValue(): boolean {
    return this.isMobile.value;
  }
}

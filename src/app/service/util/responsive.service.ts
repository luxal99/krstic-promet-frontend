import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ResponsiveService {
  private isMobile = new BehaviorSubject(window.screen.width <= 700);

  constructor() {}

  getIsMobileValue(): boolean {
    return this.isMobile.value;
  }
}

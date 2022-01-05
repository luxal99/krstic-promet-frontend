import { Injectable } from "@angular/core";
import { MatSpinner } from "@angular/material/progress-spinner";

@Injectable({
  providedIn: "root",
})
export class SpinnerService {
  show(spinner: MatSpinner): void {
    spinner._elementRef.nativeElement.style.display = "block";
  }

  hide(spinner: MatSpinner): void {
    spinner._elementRef.nativeElement.style.display = "none";
  }
}

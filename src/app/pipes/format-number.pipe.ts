import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatNumber",
})
export class FormatNumberPipe implements PipeTransform {
  transform(numberToFormat: number): string {
    return numberToFormat.toFixed(2);
  }
}

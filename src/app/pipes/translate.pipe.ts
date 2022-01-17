import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "translate",
})
export class TranslatePipe implements PipeTransform {
  transform(value: any): string {
    value = value.toUpperCase();
    switch (value) {
      case "PAID":
        value = "Plaćeno";
        break;
      case "NOT_PAID":
        value = "Neplaćeno";
        break;
    }

    return value;
  }
}

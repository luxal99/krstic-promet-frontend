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
      case "DELIVERED":
        value = "Isporučeno";
        break;
      case "NOT_DELIVERED":
        value = "Neisporučeno";
        break;
    }

    return value;
  }
}

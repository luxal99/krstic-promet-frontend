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
      case "PER_PIECE":
        value = "Po komadu";
        break;
      case "PER_UNIT":
        value = "Po jedinici";
        break;
    }

    return value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
  }
}

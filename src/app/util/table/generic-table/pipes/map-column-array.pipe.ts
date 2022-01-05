import { Pipe, PipeTransform } from "@angular/core";
import { Column } from "../../Column";

@Pipe({
  name: "mapColumnArray",
})
export class MapColumnArrayPipe implements PipeTransform {
  transform(columnArr: Column[]): string[] {
    if (!columnArr) {
      return [];
    }

    return columnArr.map((item) => item.name);
  }
}

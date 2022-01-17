import { Pipe, PipeTransform } from "@angular/core";
import { Article } from "../models/article";

@Pipe({
  name: "groupObjectInArray",
  pure: false,
})
export class GroupObjectInArrayPipe implements PipeTransform {
  transform(listOfArticles: Article[]): any[] {
    console.log(listOfArticles);
    return [
      ...new Map(
        listOfArticles
          .map((item) => ({
            id: item.id,
            code: item.code,
            sellingPrice: item.sellingPrice,
            amount: this.countOccurrence(item, listOfArticles),
            total:
              item.sellingPrice * this.countOccurrence(item, listOfArticles),
          }))
          .map((item) => [item["id"], item])
      ).values(),
    ];
  }

  countOccurrence(article: Article, listOfArticles: Article[]): number {
    return listOfArticles.filter((item) => item.id === article.id).length;
  }
}

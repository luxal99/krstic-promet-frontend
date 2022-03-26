import { Pipe, PipeTransform } from "@angular/core";
import { Client } from "../models/client";

@Pipe({
  name: "searchClient",
})
export class SearchClientPipe implements PipeTransform {
  transform(listOfClients: Client[] | null, searchText: string): Client[] {
    if (listOfClients) {
      if (searchText === "") {
        return listOfClients;
      }

      if (listOfClients.length === 0) {
        return [];
      }
      return listOfClients.filter(
        (client) =>
          client.firstName.toLocaleLowerCase().startsWith(searchText) ||
          client.lastName.toLocaleLowerCase().startsWith(searchText)
      );
    } else {
      return [];
    }
  }
}

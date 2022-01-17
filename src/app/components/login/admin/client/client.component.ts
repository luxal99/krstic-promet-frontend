import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { ClientState } from "../../../../store/reducers/client.reducer";
import { CLIENT_TABLE } from "../../../../constant/table-config/table-config";
import { FormBuilderConfig } from "../../../../util/form-components/models/FormBuilderConfig";
import { FormControlNames } from "../../../../constant/constant";
import { Validators } from "@angular/forms";
import {
  articleCategoryStoreConfig,
  clientStoreConfig,
} from "../../../../store/config/StoreConfig";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.sass"],
})
export class ClientComponent implements OnInit {
  listOfClients$: Observable<any> = this.clientStore.select(
    (state) => state.client.list
  );

  clientTableConfig = CLIENT_TABLE;

  clientDialogConfig: FormBuilderConfig = {
    formFields: [
      {
        name: FormControlNames.FIRST_NAME,
        type: "input",
        icon: "format_align_right",
        validation: [Validators.required],
        label: "Ime",
        bindValue: "",
      },
      {
        name: FormControlNames.LAST_NAME,
        type: "input",
        icon: "format_align_right",
        validation: [Validators.required],
        label: "Prezime",
        bindValue: "",
      },
      {
        name: FormControlNames.TELEPHONE,
        type: "input",
        icon: "format_align_right",
        validation: [Validators.required],
        label: "Telefon",
        bindValue: "",
      },
    ],
    headerText: "Dodaj klijenta",
    store: this.clientStore,
    storeConfig: clientStoreConfig,
  };

  constructor(
    private clientStore: Store<{
      client: ClientState;
    }>
  ) {}

  ngOnInit(): void {}
}

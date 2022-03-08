import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { ClientState } from "../../../../store/reducers/client.reducer";
import { CLIENT_TABLE } from "../../../../constant/table-config/table-config";
import { FormBuilderConfig } from "../../../../util/form-components/models/FormBuilderConfig";
import { FormControlNames } from "../../../../constant/constant";
import { Validators } from "@angular/forms";
import { clientStoreConfig } from "../../../../store/config/StoreConfig";
import { openDialog } from "../../../../util/modal/OpeningModal";
import { FormBuilderComponent } from "../../../../util/form-components/form-builder/form-builder.component";
import { setDialogConfig } from "../../../../util/modal/DialogConfig";
import { MatDialog } from "@angular/material/dialog";
import { openConfirmDialog } from "../../../../util/confirm-dialog/config/confirm-dialog-config";
import { ConfirmDialogComponent } from "../../../../util/confirm-dialog/confirm-dialog.component";
import { DeleteClientAction } from "../../../../store/actions/client.actions";
import { ClientOverviewDialogComponent } from "./client-overview-dialog/client-overview-dialog.component";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.sass"],
})
export class ClientComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @ViewChild("optionButtonsColumn") optionButtonsTemplateRef!: TemplateRef<any>;
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
    }>,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.clientTableConfig = [
      ...this.clientTableConfig,
      {
        name: "optionBtns",
        columnType: "CUSTOM",
        value: "",
        displayedName: "",
        templateRef: this.optionButtonsTemplateRef,
      },
    ];
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {}

  openAddDialog(client?: any) {
    if (client) {
      this.clientDialogConfig.formValues = client;
    }
    openDialog(
      FormBuilderComponent,
      setDialogConfig({
        width: "30%",
        data: this.clientDialogConfig,
      }),
      this.dialog
    )
      .afterClosed()
      .subscribe(() => {});
  }

  openClientOverview(client: any) {
    openDialog(
      ClientOverviewDialogComponent,
      setDialogConfig({
        width: "40%",
        height: "100vh",
        data: client,
        position: { right: "0" },
      }),
      this.dialog
    );
  }

  deleteClient(id: number) {
    openConfirmDialog(this.dialog, () => {
      this.clientStore.dispatch(new DeleteClientAction(id));
    });
  }
}

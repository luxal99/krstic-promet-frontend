import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Client } from "../../../../../models/client";
import { DeliveryNote } from "../../../../../models/delivery-note";
import { openDialog } from "../../../../../util/modal/OpeningModal";
import { DeliveryNoteOverviewComponent } from "../../delivery-note/delivery-note-overview/delivery-note-overview.component";
import { setDialogConfig } from "../../../../../util/modal/DialogConfig";
import { ClientService } from "../../../../../service/client.service";
import { MatSpinner } from "@angular/material/progress-spinner";
import { SpinnerService } from "../../../../../util/spinner/spinner.service";

@Component({
  selector: "app-client-overview-dialog",
  templateUrl: "./client-overview-dialog.component.html",
  styleUrls: ["./client-overview-dialog.component.sass"],
})
export class ClientOverviewDialogComponent implements OnInit {
  @ViewChild("spinner") spinner!: MatSpinner;
  listOfDeliveryNotes: DeliveryNote[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private dialog: MatDialog,
    public clientService: ClientService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.findDeliveryNotes();
  }

  findDeliveryNotes(): void {
    this.clientService
      .findDeliveryNotesByClientId(this.data.id)
      .subscribe((resp) => {
        this.listOfDeliveryNotes = resp;
        this.spinnerService.hide(this.spinner);
      });
  }

  openDeliveryNoteOverviewDialog(data: DeliveryNote) {
    openDialog(
      DeliveryNoteOverviewComponent,
      setDialogConfig({
        data,
        width: "70%",
      }),
      this.dialog
    );
  }
}

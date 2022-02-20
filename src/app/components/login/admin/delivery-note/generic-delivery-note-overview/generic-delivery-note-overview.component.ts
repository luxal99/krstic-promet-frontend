import { Component, Input, OnInit } from "@angular/core";
import { DeliveryNote } from "../../../../../models/delivery-note";
import { DELIVERY_NOTE_TABLE } from "../../../../../constant/table-config/table-config";
import { DeliveryNoteService } from "../../../../../service/delivery-note.service";
import { MatDialog } from "@angular/material/dialog";
import { openConfirmDialog } from "../../../../../util/confirm-dialog/config/confirm-dialog-config";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarUtil } from "../../../../../util/snackbar/snackbar-util";
import { openDialog } from "../../../../../util/modal/OpeningModal";
import { AddDeliveryNoteComponent } from "../add-delivery-note/add-delivery-note.component";
import { setDialogConfig } from "../../../../../util/modal/DialogConfig";

@Component({
  selector: "app-generic-delivery-note-overview",
  templateUrl: "./generic-delivery-note-overview.component.html",
  styleUrls: ["./generic-delivery-note-overview.component.sass"],
})
export class GenericDeliveryNoteOverviewComponent implements OnInit {
  @Input() listOfDeliveryNotes: DeliveryNote[] | null = [];
  @Input() startDate = "";
  @Input() endDate = "";
  tableConfig = DELIVERY_NOTE_TABLE;

  constructor(
    private deliveryNoteService: DeliveryNoteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getDeliveryNotesForCurrentWeek();
  }

  getDeliveryNotesForCurrentWeek(): void {
    this.deliveryNoteService
      .getDeliveryNoteByQuery(
        encodeURI(
          JSON.stringify({
            pagination: { page: 0, rows: 10 },
            startDate: this.startDate,
            endDate: this.endDate,
          })
        )
      )
      .subscribe((resp) => {
        this.listOfDeliveryNotes = resp.body;
      });
  }

  deleteDeliveryNote(id: any) {
    openConfirmDialog(this.dialog, () => {
      this.deliveryNoteService.delete(id).subscribe(() => {
        this.getDeliveryNotesForCurrentWeek();
        SnackBarUtil.openSnackBar(this.snackBar, "Uspešno obrisana otpremnica");
      });
    });
  }

  openEditDeliveryNote(deliveryNote: DeliveryNote): void {
    openDialog(
      AddDeliveryNoteComponent,
      setDialogConfig({
        maxWidth: "100vw",
        maxHeight: "100vh",
        height: "100%",
        width: "100%",
        autoFocus: false,
        data: deliveryNote,
      }),
      this.dialog
    );
  }
}

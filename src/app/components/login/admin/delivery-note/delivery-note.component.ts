import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { openDialog } from "../../../../util/modal/OpeningModal";
import { AddDeliveryNoteComponent } from "./add-delivery-note/add-delivery-note.component";
import { setDialogConfig } from "../../../../util/modal/DialogConfig";
import { DeliveryNote } from "../../../../models/delivery-note";

@Component({
  selector: "app-delivery-note",
  templateUrl: "./delivery-note.component.html",
  styleUrls: ["./delivery-note.component.sass"],
})
export class DeliveryNoteComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddDeliveryNoteDialog(): void {
    openDialog(
      AddDeliveryNoteComponent,
      setDialogConfig({
        maxWidth: "100vw",
        maxHeight: "100vh",
        height: "100%",
        width: "100%",
        autoFocus: false,
      }),
      this.dialog
    )
      .afterClosed()
      .subscribe(() => {});
  }
}

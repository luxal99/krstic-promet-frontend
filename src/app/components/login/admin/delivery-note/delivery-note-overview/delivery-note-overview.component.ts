import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DeliveryNote } from "../../../../../models/delivery-note";

@Component({
  selector: "app-delivery-note-overview",
  templateUrl: "./delivery-note-overview.component.html",
  styleUrls: ["./delivery-note-overview.component.sass"],
})
export class DeliveryNoteOverviewComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public deliveryNote: DeliveryNote) {}

  ngOnInit(): void {
    console.log(this.deliveryNote);
  }
}

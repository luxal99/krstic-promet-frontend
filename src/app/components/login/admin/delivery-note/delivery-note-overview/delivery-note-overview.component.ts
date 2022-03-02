import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DeliveryNote } from "../../../../../models/delivery-note";
import { DeliveryNotePaidStatusEnum } from "../../../../../enum/DeliveryNotePaidStatusEnum";
import { Column } from "generic-material-table/lib/models/Column";

@Component({
  selector: "app-delivery-note-overview",
  templateUrl: "./delivery-note-overview.component.html",
  styleUrls: ["./delivery-note-overview.component.sass"],
})
export class DeliveryNoteOverviewComponent implements OnInit {
  public paidStatus: DeliveryNotePaidStatusEnum | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public deliveryNote: DeliveryNote) {}

  articlesTableColumns: Column[] = [
    {
      name: "name",
      columnType: "GENERIC",
      value: "idArticle.name",
      displayedName: "Naziv",
    },
    {
      name: "code",
      columnType: "GENERIC",
      value: "idArticle.code",
      displayedName: "Šifra",
    },
    {
      name: "amount",
      columnType: "GENERIC",
      value: "amount",
      displayedName: "Količina",
    },
  ];

  ngOnInit(): void {
    console.log(this.deliveryNote);
  }
}

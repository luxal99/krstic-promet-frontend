import { Component, OnInit } from "@angular/core";
import { DeliveryNote } from "../../../../../models/delivery-note";
import { DELIVERY_NOTE_TABLE } from "../../../../../constant/table-config/table-config";
import { DeliveryNoteService } from "../../../../../service/delivery-note.service";
import * as moment from "moment";
import { DATE_VALUE_FORMAT } from "../../../../../constant/constant";

@Component({
  selector: "app-current-month-overview",
  templateUrl: "./current-month-overview.component.html",
  styleUrls: ["./current-month-overview.component.sass"],
})
export class CurrentMonthOverviewComponent implements OnInit {
  listOfDeliveryNotes: DeliveryNote[] | null = [];
  startDate = moment().startOf("month").format(DATE_VALUE_FORMAT);
  endDate = moment().endOf("month").format(DATE_VALUE_FORMAT);

  tableConfig = DELIVERY_NOTE_TABLE;

  constructor(private deliveryNoteService: DeliveryNoteService) {}

  ngOnInit(): void {}
}

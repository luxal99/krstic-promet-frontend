import { Component, OnInit } from "@angular/core";
import { DeliveryNote } from "../../../../../models/delivery-note";
import * as moment from "moment";
import {
  DATE_VALUE_FORMAT,
  FormControlNames,
} from "../../../../../constant/constant";
import { DELIVERY_NOTE_TABLE } from "../../../../../constant/table-config/table-config";
import { DeliveryNoteService } from "../../../../../service/delivery-note.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-custom-period-overview",
  templateUrl: "./custom-period-overview.component.html",
  styleUrls: ["./custom-period-overview.component.sass"],
})
export class CustomPeriodOverviewComponent implements OnInit {
  listOfDeliveryNotes: DeliveryNote[] = [];
  startDate = moment().startOf("month").format(DATE_VALUE_FORMAT);
  endDate = moment().endOf("month").format(DATE_VALUE_FORMAT);

  dateForm = new FormGroup({
    startDate: new FormControl(""),
    endDate: new FormControl(""),
  });
  tableConfig = DELIVERY_NOTE_TABLE;

  constructor(private deliveryNoteService: DeliveryNoteService) {}

  ngOnInit(): void {}

  filterDate() {
    this.startDate = moment(
      this.dateForm.get(FormControlNames.START_DATE)?.value
    ).format(DATE_VALUE_FORMAT);
    this.endDate = moment(
      this.dateForm.get(FormControlNames.END_DATE)?.value
    ).format(DATE_VALUE_FORMAT);
  }
}

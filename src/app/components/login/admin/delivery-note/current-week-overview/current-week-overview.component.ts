import { Component, OnInit } from "@angular/core";
import { DeliveryNoteService } from "../../../../../service/delivery-note.service";
import { DeliveryNote } from "../../../../../models/delivery-note";
import * as moment from "moment";
import { DATE_VALUE_FORMAT } from "../../../../../constant/constant";
import { DELIVERY_NOTE_TABLE } from "../../../../../constant/table-config/table-config";
@Component({
  selector: "app-current-week-overview",
  templateUrl: "./current-week-overview.component.html",
  styleUrls: ["./current-week-overview.component.sass"],
})
export class CurrentWeekOverviewComponent implements OnInit {
  listOfDeliveryNotes: DeliveryNote[] | null = [];

  tableConfig = DELIVERY_NOTE_TABLE;

  constructor(private deliveryNoteService: DeliveryNoteService) {}

  ngOnInit(): void {
    this.getDeliveryNotesForCurrentWeek();
  }

  getDeliveryNotesForCurrentWeek(): void {
    this.deliveryNoteService
      .getDeliveryNoteByQuery(
        encodeURI(
          JSON.stringify({
            pagination: { page: 0, rows: 10 },
            startDate: moment().startOf("isoWeek").format(DATE_VALUE_FORMAT),
            endDate: moment().endOf("isoWeek").format(DATE_VALUE_FORMAT),
          })
        )
      )
      .subscribe((resp) => {
        this.listOfDeliveryNotes = resp.body;
      });
  }
}

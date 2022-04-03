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
import { PaginationDto } from "../../../../../models/dto/PaginationDto";
import { DateQueryDto } from "../../../../../models/dto/DateQueryDto";
import { PaginationData } from "../../../../../models/dto/PaginationData";
import { ClientDateFilterDialogComponent } from "./client-date-filter-dialog/client-date-filter-dialog.component";
import { PageEvent } from "@angular/material/paginator/paginator";

@Component({
  selector: "app-client-overview-dialog",
  templateUrl: "./client-overview-dialog.component.html",
  styleUrls: ["./client-overview-dialog.component.sass"],
})
export class ClientOverviewDialogComponent implements OnInit {
  @ViewChild("spinner") spinner!: MatSpinner;
  listOfDeliveryNotes: DeliveryNote[] = [];

  pagination: PaginationDto = { page: 0, rows: 6 };
  paginationData: PaginationData = { dataCount: 0 };

  totalDebt = 0;
  totalPaid = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private dialog: MatDialog,
    public clientService: ClientService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.findDeliveryNotes();
    this.getTotalClientDebt();
    this.getTotalClientPaid();
  }

  findDeliveryNotes(pagination?: PageEvent, dateQueryDto?: DateQueryDto): void {
    if (pagination) {
      this.pagination = {
        page: pagination.pageIndex,
        rows: pagination.pageSize,
      };
    }
    this.clientService
      .findDeliveryNotesByClientId(this.data.id, {
        pagination: this.pagination,
        dateQueryDto: dateQueryDto,
      })
      .subscribe((resp) => {
        this.listOfDeliveryNotes = resp.body;
        this.paginationData.dataCount = Number.parseInt(
          <string>resp.headers.get("total")
        );
        this.spinnerService.hide(this.spinner);
      });
  }

  getTotalClientDebt() {
    this.clientService.getTotalDebtForClient(this.data.id).subscribe((resp) => {
      this.totalDebt = resp.totalDebt;
    });
  }

  getTotalClientPaid() {
    this.clientService.getTotalPaidForClient(this.data.id).subscribe((resp) => {
      this.totalPaid = resp.totalPaid;
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

  openDateFilterDialog() {
    openDialog(
      ClientDateFilterDialogComponent,
      setDialogConfig({}),
      this.dialog
    )
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.findDeliveryNotes(resp);
        }
      });
  }
}

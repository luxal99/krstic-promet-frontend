import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { DeliveryNoteService } from "../../../../service/delivery-note.service";
import { DeliveryNote } from "../../../../models/delivery-note";
import { DeliveryNotePaidStatusEnum } from "../../../../enum/DeliveryNotePaidStatusEnum";
import { DeliveryNoteStatusEnum } from "../../../../enum/DeliveryNoteStatusEnum";
import { DELIVERY_NOTE_TABLE } from "../../../../constant/table-config/table-config";
import { openDialog } from "../../../../util/modal/OpeningModal";
import { DeliveryNoteOverviewComponent } from "../delivery-note/delivery-note-overview/delivery-note-overview.component";
import { setDialogConfig } from "../../../../util/modal/DialogConfig";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"],
})
export class DashboardComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @ViewChild("overviewButton") overviewButtonTemplate!: TemplateRef<any>;

  @ViewChild("dateColumn") dateTemplateRef!: TemplateRef<any>;
  listOfUnPaidDeliveryNotes: DeliveryNote[] = [];
  listOfUnDeliveredDeliveryNotes: DeliveryNote[] = [];

  deliveryNoteTableConfig = DELIVERY_NOTE_TABLE;

  constructor(
    private deliveryNoteService: DeliveryNoteService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.deliveryNoteTableConfig = [
      {
        name: "date",
        displayedName: "Datum otpremnice",
        value: "",
        columnType: "CUSTOM",
        templateRef: this.dateTemplateRef,
      },
      ...this.deliveryNoteTableConfig,
      {
        name: "overviewBtn",
        value: "",
        columnType: "CUSTOM",
        displayedName: "",
        templateRef: this.overviewButtonTemplate,
      },
    ];
  }

  ngOnInit(): void {
    this.getUnPaidDeliveryNotes();
    this.getUnDeliveredDeliveryNotes();
  }

  getUnPaidDeliveryNotes() {
    this.deliveryNoteService
      .findByDeliveryNotePaidStatus(DeliveryNotePaidStatusEnum.NOT_PAID)
      .subscribe((resp) => {
        this.listOfUnPaidDeliveryNotes = resp;
      });
  }

  getUnDeliveredDeliveryNotes() {
    this.deliveryNoteService
      .findByDeliveryNoteDeliveryStatus(DeliveryNoteStatusEnum.NOT_DELIVERED)
      .subscribe((resp) => {
        this.listOfUnDeliveredDeliveryNotes = resp;
      });
  }

  openDeliveryNoteOverview(deliveryNote: any): void {
    openDialog(
      DeliveryNoteOverviewComponent,
      setDialogConfig({
        data: deliveryNote,
        width: "50%",
      }),
      this.dialog
    )
      .afterClosed()
      .subscribe((resp) => {
        this.getUnDeliveredDeliveryNotes();
        this.getUnPaidDeliveryNotes();
      });
  }
}

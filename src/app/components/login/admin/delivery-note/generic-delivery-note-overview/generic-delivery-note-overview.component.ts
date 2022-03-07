import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from "@angular/core";
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
import { BehaviorService } from "../../../../../service/util/behavior.service";
import { DeliveryNoteOverviewComponent } from "../delivery-note-overview/delivery-note-overview.component";

@Component({
  selector: "app-generic-delivery-note-overview",
  templateUrl: "./generic-delivery-note-overview.component.html",
  styleUrls: ["./generic-delivery-note-overview.component.sass"],
})
export class GenericDeliveryNoteOverviewComponent
  implements
    OnInit,
    OnDestroy,
    OnChanges,
    AfterViewInit,
    AfterViewChecked,
    AfterContentChecked
{
  @ViewChild("options") optionsTemplateRef!: TemplateRef<any>;
  @ViewChild("paidStatusColumn") paidStatusColumnTemplateRef!: TemplateRef<any>;
  @Input() listOfDeliveryNotes: DeliveryNote[] = [];
  @Input() startDate = "";
  @Input() endDate = "";
  tableConfig = DELIVERY_NOTE_TABLE;

  constructor(
    private deliveryNoteService: DeliveryNoteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private updateDeliveryNoteBS: BehaviorService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterContentChecked(): void {}

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.tableConfig = [
      ...this.tableConfig,
      {
        name: "paidStatus",
        value: "",
        templateRef: this.paidStatusColumnTemplateRef,
        columnType: "CUSTOM",
        displayedName: "Status plaćanja",
      },
      {
        name: "option",
        value: "",
        templateRef: this.optionsTemplateRef,
        columnType: "CUSTOM",
        displayedName: "",
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.startDate.firstChange && !changes.endDate.firstChange) {
      this.getDeliveryNotes();
    }
  }

  ngOnInit(): void {
    this.getDeliveryNotes();
    this.updateListOfDeliveryNotes();
  }

  updateListOfDeliveryNotes() {
    this.updateDeliveryNoteBS.updateDeliveryNotes.subscribe((resp) => {
      if (resp) {
        this.getDeliveryNotes();
      }
    });
  }

  getDeliveryNotes(): void {
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
        //@ts-ignore
        this.listOfDeliveryNotes = resp.body;
      });
  }

  deleteDeliveryNote(id: any) {
    openConfirmDialog(this.dialog, () => {
      this.deliveryNoteService.delete(id).subscribe(() => {
        this.getDeliveryNotes();
        SnackBarUtil.openSnackBar(this.snackBar, "Uspešno obrisana otpremnica");
      });
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
    );
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

  ngOnDestroy(): void {}
}

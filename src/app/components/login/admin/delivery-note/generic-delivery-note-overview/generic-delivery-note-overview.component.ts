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
import { openDialog } from "../../../../../util/modal/OpeningModal";
import { AddDeliveryNoteComponent } from "../add-delivery-note/add-delivery-note.component";
import { setDialogConfig } from "../../../../../util/modal/DialogConfig";
import { BehaviorService } from "../../../../../service/util/behavior.service";
import { DeliveryNoteOverviewComponent } from "../delivery-note-overview/delivery-note-overview.component";
import { Store } from "@ngrx/store";
import { ArticleState } from "../../../../../store/reducers/article.reducer";
import { GetArticleAction } from "../../../../../store/actions/article.actions";
import { openToastNotification } from "../../../../../util/toast-notification/openToastNotification";
import { PaginationData } from "../../../../../models/dto/PaginationData";
import { PageEvent } from "@angular/material/paginator/paginator";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { map, take } from "rxjs/operators";

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
  @ViewChild("dateColumn") dateTemplateRef!: TemplateRef<any>;
  @ViewChild("paidStatusColumn") paidStatusColumnTemplateRef!: TemplateRef<any>;
  @Input() listOfDeliveryNotes: DeliveryNote[] = [];
  @Input() startDate = "";
  @Input() endDate = "";
  tableConfig = DELIVERY_NOTE_TABLE;

  pagination: PaginationData = { dataCount: 0, total: 0 };
  dateFilter: ReplaySubject<SimpleChanges> = new ReplaySubject(10);

  constructor(
    private deliveryNoteService: DeliveryNoteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private updateDeliveryNoteBS: BehaviorService,
    private cdRef: ChangeDetectorRef,
    private articleStore: Store<{
      articles: ArticleState;
    }>
  ) {}

  ngAfterContentChecked(): void {}

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.tableConfig = [
      {
        name: "date",
        displayedName: "Datum otpremnice",
        value: "",
        columnType: "CUSTOM",
        templateRef: this.dateTemplateRef,
      },
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
    this.dateFilter.next(changes);
    this.dateFilter
      .pipe(
        map((value) => {
          if (
            (value.startDate && !value.startDate.firstChange) ||
            (value.endDate && !value.endDate.firstChange)
          ) {
            return value;
          } else {
            return null;
          }
        }),
        take(1)
      )
      .subscribe((resp) => {
        if (resp) {
          this.startDate = resp.startDate.currentValue;
          this.endDate = resp.endDate.currentValue;
          this.getDeliveryNotes();
        }
      });
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

  getDeliveryNotes(pagination?: PageEvent): void {
    this.deliveryNoteService
      .getDeliveryNoteByQuery(
        encodeURI(
          JSON.stringify({
            pagination: pagination
              ? { page: pagination.pageIndex, rows: pagination.pageSize }
              : { page: 0, rows: 10 },
            startDate: this.startDate,
            endDate: this.endDate,
          })
        )
      )
      .subscribe((resp) => {
        this.pagination.dataCount = Number.parseInt(
          <string>resp.headers.get("TOTAL")
        );
        //@ts-ignore
        this.listOfDeliveryNotes = resp.body;
      });
  }

  deleteDeliveryNote(id: any) {
    openConfirmDialog(this.dialog, () => {
      this.deliveryNoteService.delete(id).subscribe(() => {
        this.getDeliveryNotes();
        this.articleStore.dispatch(new GetArticleAction());
        openToastNotification(
          {
            notificationType: "SUCCESS",
            message: "Uspešno ste obrisali otpremnicu",
          },
          this.dialog
        );
      });
    });
  }

  openDeliveryNoteOverview(deliveryNote: any): void {
    openDialog(
      DeliveryNoteOverviewComponent,
      setDialogConfig({
        data: deliveryNote,
        width: "70%",
      }),
      this.dialog
    )
      .afterClosed()
      .subscribe(() => {
        this.getDeliveryNotes();
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
    )
      .afterClosed()
      .subscribe(() => {
        this.getDeliveryNotes();
      });
  }

  ngOnDestroy(): void {}
}

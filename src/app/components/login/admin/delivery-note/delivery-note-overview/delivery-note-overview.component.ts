import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { DeliveryNote } from "../../../../../models/delivery-note";
import { DeliveryNotePaidStatusEnum } from "../../../../../enum/DeliveryNotePaidStatusEnum";
import { Column } from "generic-material-table/lib/models/Column";
import { openDialog } from "../../../../../util/modal/OpeningModal";
import { ArticleConfirmDialogComponent } from "../add-delivery-note/article-confirm-dialog/article-confirm-dialog.component";
import { ArticleConfirmDialogData } from "../../../../../models/dto/ArticleConfirmDialogData";
import { DeliveryNoteService } from "../../../../../service/delivery-note.service";
import { GetArticleAction } from "../../../../../store/actions/article.actions";
import { openToastNotification } from "../../../../../util/toast-notification/openToastNotification";
import { Store } from "@ngrx/store";
import { ArticleState } from "../../../../../store/reducers/article.reducer";
import { DeliveryNoteStatusEnum } from "../../../../../enum/DeliveryNoteStatusEnum";

@Component({
  selector: "app-delivery-note-overview",
  templateUrl: "./delivery-note-overview.component.html",
  styleUrls: ["./delivery-note-overview.component.sass"],
})
export class DeliveryNoteOverviewComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  public paidStatus: DeliveryNotePaidStatusEnum | undefined;
  @ViewChild("deliveredAmountColumn")
  deliveredColumnTemplateRef!: TemplateRef<any>;
  @ViewChild("payedAmountColumn") payedColumnTemplateRef!: TemplateRef<any>;
  @ViewChild("updateAmountColumn") updateAmountTemplateRef!: TemplateRef<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public deliveryNote: DeliveryNote,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private deliveryNoteService: DeliveryNoteService,
    private articleStore: Store<{
      articles: ArticleState;
    }>
  ) {}

  ngAfterViewInit(): void {
    this.articlesTableColumns = [
      ...this.articlesTableColumns,
      {
        name: "deliveredAmount",
        value: "",
        templateRef: this.deliveredColumnTemplateRef,
        columnType: "CUSTOM",
        displayedName: "Dostavljena količina",
      },
      {
        name: "payedAmount",
        value: "",
        templateRef: this.payedColumnTemplateRef,
        columnType: "CUSTOM",
        displayedName: "Plaćena količina",
      },
      {
        name: "updateAmount",
        value: "",
        templateRef: this.updateAmountTemplateRef,
        columnType: "CUSTOM",
        displayedName: "",
      },
    ];
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

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

  ngOnInit(): void {}

  openArticleConfirmDialog(element: any) {
    openDialog(
      ArticleConfirmDialogComponent,
      {
        width: "90%",
        disableClose: true,
        data: {
          listOfArticles: this.deliveryNote.listOfArticles,
          paidStatus: this.deliveryNote.paidStatus,
          deliveredStatus: this.deliveryNote.deliveryStatus,
        } as ArticleConfirmDialogData,
      },
      this.dialog
    )
      .afterClosed()
      .subscribe((resp) => {
        if (resp.confirmed) {
          resp.listOfArticles = resp.listOfArticles.map((item: any) => ({
            // @ts-ignore
            id: item.idArticle.id,
            // @ts-ignore
            name: item.idArticle.name,
            sellingPrice: item.sellingPrice,
            amount: item.amount,
            amountInWarehouse: item.idArticle?.amount,
            // @ts-ignore
            code: item.idArticle.code,
            payedAmount: item.payedAmount,
            deliveredAmount: item.deliveredAmount,
            idDeliveryNoteArticle: item.id,
            // @ts-ignore
            total: item.amount * item.sellingPrice,
          }));
          this.deliveryNoteService
            .update({
              id: this.deliveryNote.id,
              gross: this.deliveryNote.gross,
              dateOfDeliveryNote: this.deliveryNote.dateOfDeliveryNote,
              listOfArticles: resp.listOfArticles,
              createdDate: this.deliveryNote.createdDate,
              idClient: this.deliveryNote.idClient,
              deliveryStatus: (this.deliveryNote.deliveryStatus =
                this.deliveryNote.listOfArticles.every(
                  (value: any) => value.deliveryStatus === "DELIVERED"
                )
                  ? DeliveryNoteStatusEnum.DELIVERED
                  : DeliveryNoteStatusEnum.NOT_DELIVERED),
              paidStatus: (this.deliveryNote.paidStatus =
                this.deliveryNote.listOfArticles.every(
                  (value: any) => value.paidStatus === "PAID"
                )
                  ? DeliveryNotePaidStatusEnum.PAID
                  : DeliveryNotePaidStatusEnum.NOT_PAID),
            })
            .subscribe(
              (resp) => {
                this.articleStore.dispatch(new GetArticleAction());
                openToastNotification(
                  {
                    notificationType: "SUCCESS",
                    message: "Uspešno ažuriranje otpremnice",
                  },
                  this.dialog
                );
              },
              () => {
                openToastNotification(
                  {
                    notificationType: "ERROR",
                    message:
                      "Dogododila se greška prilikom ažuriranja otpremnice",
                  },
                  this.dialog
                );
              }
            );
        }
      });
  }
}

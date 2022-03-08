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
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ClientState } from "../../../../../store/reducers/client.reducer";
import { ArticleState } from "../../../../../store/reducers/article.reducer";
import { FieldConfig } from "../../../../../util/form-components/models/FieldConfig";
import { DeliveryNotePaidStatusEnum } from "../../../../../enum/DeliveryNotePaidStatusEnum";
import { FormControlNames } from "../../../../../constant/constant";
import { SelectedArticleDto } from "../../../../../models/dto/SelectedArticleDto";
import { DeliveryNoteService } from "../../../../../service/delivery-note.service";
import * as moment from "moment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Client } from "../../../../../models/client";
import { GetArticleAction } from "../../../../../store/actions/article.actions";
import { BehaviorService } from "../../../../../service/util/behavior.service";
import { debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { ArticleService } from "../../../../../service/article.service";
import { Article } from "../../../../../models/article";
import { DeliveryNoteStatusEnum } from "../../../../../enum/DeliveryNoteStatusEnum";
import { ARTICLE_TABLE } from "../../../../../constant/table-config/table-config";
import { MatSpinner } from "@angular/material/progress-spinner";
import { SpinnerService } from "../../../../../util/spinner/spinner.service";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { DeliveryNote } from "../../../../../models/delivery-note";
import { openDialog } from "../../../../../util/modal/OpeningModal";
import { ArticleConfirmDialogComponent } from "./article-confirm-dialog/article-confirm-dialog.component";
import { setDialogConfig } from "../../../../../util/modal/DialogConfig";
import { ArticleConfirmDialogData } from "../../../../../models/dto/ArticleConfirmDialogData";
import { openToastNotification } from "../../../../../util/toast-notification/openToastNotification";
import { DeliveryNoteArticleService } from "../../../../../service/delivery-note-article.service";

@Component({
  selector: "app-add-delivery-note",
  templateUrl: "./add-delivery-note.component.html",
  styleUrls: ["./add-delivery-note.component.sass"],
})
export class AddDeliveryNoteComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @ViewChild("spinner") spinner!: MatSpinner;
  @ViewChild("amountColumn") amountColumn!: TemplateRef<any>;
  public total = 0;
  listOfSelectedArticles: SelectedArticleDto[] = [];

  listOfArticles: Article[] = [];

  articleTableDisplayedColumns = ARTICLE_TABLE;

  public listOfClients$ = this.clientStore.select((state) => state.client.list);

  deliveryNoteForm = new FormGroup({
    idClient: new FormControl(""),
    gross: new FormControl("", Validators.required),
    dateOfDeliveryNote: new FormControl(new Date(), Validators.required),
  });

  amountForm = new FormGroup({
    amount: new FormControl(1),
  });
  searchForm = new FormGroup({
    search: new FormControl(""),
  });

  amountInputConfig: FieldConfig = {
    bindValue: "",
    name: FormControlNames.AMOUNT,
    type: "input",
  };

  dateOfDeliveryNoteConfig: FieldConfig = {
    bindValue: "",
    name: FormControlNames.DATE_OF_DELIVERY_NOTE,
    type: "date",
  };
  grossInputConfig: FieldConfig = {
    bindValue: "",
    name: FormControlNames.GROSS,
    type: "input",
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeliveryNote,
    private clientStore: Store<{
      client: ClientState;
    }>,
    private articleStore: Store<{
      articles: ArticleState;
    }>,
    private snackBar: MatSnackBar,
    private deliveryNoteService: DeliveryNoteService,
    private articleService: ArticleService,
    private updateDeliveryNoteBS: BehaviorService,
    private cdRef: ChangeDetectorRef,
    private spinnerService: SpinnerService,
    private deliveryNoteArticleService: DeliveryNoteArticleService,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.searchForArticle();
    this.articleTableDisplayedColumns = [
      ...this.articleTableDisplayedColumns,
      {
        name: "amountInput",
        columnType: "CUSTOM",
        value: "",
        templateRef: this.amountColumn,
        displayedName: "",
      },
    ];
    this.setValues();
  }

  ngOnInit(): void {}

  setValues() {
    if (this.data) {
      this.deliveryNoteForm
        .get(FormControlNames.PAID_STATUS)
        ?.setValue(this.data.paidStatus);
      this.deliveryNoteForm
        .get(FormControlNames.DELIVERY_STATUS)
        ?.setValue(this.data.deliveryStatus);
      //@ts-ignore
      this.listOfSelectedArticles = this.data.listOfArticles.map((item) => ({
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
      this.total = this.data.gross;
    }
  }

  addArticle(article: SelectedArticleDto | any, amountInputValue?: any): void {
    let isArticleExistingInArray: SelectedArticleDto | undefined =
      this.listOfSelectedArticles.find((item) => article.id === item.id);
    const index = this.listOfSelectedArticles.findIndex(
      (item) => article.id === item.id
    );

    if (!amountInputValue) {
      amountInputValue = 1;
    }
    const amountValue = Number.parseInt(amountInputValue);
    if (isArticleExistingInArray) {
      this.listOfSelectedArticles[index].amount += amountValue;
      this.listOfSelectedArticles[index].total +=
        amountValue * article.sellingPrice;
    } else {
      this.listOfSelectedArticles.push({
        id: article.id,
        code: article.code,
        amount: article.idConversion
          ? amountValue * article.idConversion.conversionToValue
          : amountValue,
        amountInWarehouse: article.amount,
        total: article.idConversion
          ? amountValue *
            article.idConversion.conversionToValue *
            article.sellingPrice
          : amountValue * article.sellingPrice,
        sellingPrice: article.sellingPrice,
        name: article.name,
        payedAmount: this.data ? article.payedAmount : 0,
        deliveredAmount: this.data ? article.deliveredAmount : 0,
      });
    }

    this.total += article.sellingPrice * amountValue;
  }

  decreaseArticle(article: SelectedArticleDto | any): void {
    const articleForRemove: SelectedArticleDto | undefined =
      this.listOfSelectedArticles.find((item) => article.id === item.id);
    const index = this.listOfSelectedArticles.findIndex(
      (item) => article.id === item.id
    );
    if (articleForRemove && articleForRemove.amount === 1) {
      this.listOfSelectedArticles.splice(
        this.listOfSelectedArticles.indexOf(article),
        1
      );
    } else {
      this.listOfSelectedArticles[index].amount -= 1;
      this.listOfSelectedArticles[index].total -=
        this.listOfSelectedArticles[index].sellingPrice;
    }
    this.total -= article.sellingPrice;
  }

  removeArticle(article: SelectedArticleDto | any): void {
    const articleById: SelectedArticleDto | undefined =
      this.listOfSelectedArticles.find((item) => item.id === article.id);
    this.listOfSelectedArticles.splice(article, 1);
    //@ts-ignore
    this.total -= articleById?.total;

    const deliveryNoteById = this.data.listOfArticles.find(
      //@ts-ignore
      (item) => item.idArticle.id === article.id
    );
    if (this.data && deliveryNoteById) {
      this.deliveryNoteArticleService
        .delete(deliveryNoteById.id)
        .subscribe(() => {
          openToastNotification(
            {
              notificationType: "SUCCESS",
              message: "Uspešno uklonjen artikl",
            },
            this.dialog
          );
        });
    }
  }

  save(): void {
    const deliveryNote: DeliveryNote = {
      gross: this.total,
      paidStatus: DeliveryNotePaidStatusEnum.NOT_PAID,
      deliveryStatus: DeliveryNoteStatusEnum.NOT_DELIVERED,
      dateOfDeliveryNote: moment(
        this.deliveryNoteForm.get(FormControlNames.DATE_OF_DELIVERY_NOTE)?.value
      ).format("YYYY-MM-DD"),
      listOfArticles: this.listOfSelectedArticles,
      idClient:
        this.deliveryNoteForm.get(FormControlNames.ID_CLIENT)?.value !== ""
          ? this.deliveryNoteForm.get(FormControlNames.ID_CLIENT)?.value
          : null,
    };
    openDialog(
      ArticleConfirmDialogComponent,
      setDialogConfig({
        width: "90%",
        data: {
          listOfArticles: this.listOfSelectedArticles,
          paidStatus:
            this.data && this.data.paidStatus === "PAID" ? "PAID" : "NOT_PAID",
          deliveredStatus:
            this.data && this.data.deliveryStatus === "DELIVERED"
              ? "DELIVERED"
              : "NOT_DELIVERED",
        } as ArticleConfirmDialogData,
        disableClose: true,
      }),
      this.dialog
    )
      .afterClosed()
      .subscribe((resp) => {
        if (resp.confirmed) {
          deliveryNote.paidStatus = resp.listOfArticles.every(
            (value: any) => value.paidStatus === "PAID"
          )
            ? DeliveryNotePaidStatusEnum.PAID
            : DeliveryNotePaidStatusEnum.NOT_PAID;

          deliveryNote.deliveryStatus = resp.listOfArticles.every(
            (value: any) => value.deliveryStatus === "DELIVERED"
          )
            ? DeliveryNoteStatusEnum.DELIVERED
            : DeliveryNoteStatusEnum.NOT_DELIVERED;
          deliveryNote.listOfArticles = resp.listOfArticles;
          if (this.data) {
            deliveryNote.id = this.data.id;
            this.deliveryNoteService.update(deliveryNote).subscribe(
              (resp) => {
                openToastNotification(
                  {
                    notificationType: "SUCCESS",
                    message: "Uspešno ažuriranje otpremnice",
                  },
                  this.dialog
                );
                this.updateDeliveryNoteBS.setValueForUpdateDeliveryNoteBehaviorSubject(
                  true
                );
                this.articleStore.dispatch(new GetArticleAction());
              },
              () => {
                openToastNotification(
                  {
                    notificationType: "ERROR",
                    message:
                      "Dogodila se greška  prilikom ažuriranja otpremnice",
                  },
                  this.dialog
                );
              }
            );
          } else {
            this.deliveryNoteService.save(deliveryNote).subscribe(
              (resp) => {
                openToastNotification(
                  {
                    notificationType: "SUCCESS",
                    message: "Uspešno dodavanje otpremnice",
                  },
                  this.dialog
                );
                this.updateDeliveryNoteBS.setValueForUpdateDeliveryNoteBehaviorSubject(
                  true
                );
                this.articleStore.dispatch(new GetArticleAction());
              },
              () => {
                openToastNotification(
                  {
                    notificationType: "ERROR",
                    message: "Dogodila se greška prilikom dodavanja",
                  },
                  this.dialog
                );
              }
            );
          }
        }
      });
  }

  searchForArticle() {
    this.searchForm
      .get(FormControlNames.SEARCH)
      ?.valueChanges.pipe(
        filter((inputValue) => {
          if (inputValue.length > 1) {
            this.spinnerService.show(this.spinner);
            return inputValue;
          } else {
            this.spinnerService.hide(this.spinner);
          }
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((searchText) => {
        this.articleService
          .searchForRealEstate(searchText)
          .subscribe((resp) => {
            this.listOfArticles = resp;
            this.spinnerService.hide(this.spinner);
          });
      });
  }

  displayClient(client: Client): string {
    return client ? client.firstName + " " + client.lastName : "";
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}

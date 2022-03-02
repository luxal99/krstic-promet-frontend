import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
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
import { SnackBarUtil } from "../../../../../util/snackbar/snackbar-util";
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
    paidStatus: new FormControl(""),
    deliveredStatus: new FormControl(""),
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

  paidStatusSelectConfig: FieldConfig = {
    bindValue: "",
    name: FormControlNames.PAID_STATUS,
    type: "select",
    options: Object.values(DeliveryNotePaidStatusEnum),
  };
  deliveryStatusSelectConfig: FieldConfig = {
    bindValue: "",
    name: FormControlNames.PAID_STATUS,
    type: "select",
    options: Object.values(DeliveryNoteStatusEnum),
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
    private spinnerService: SpinnerService
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
  }

  ngOnInit(): void {}

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
  }

  save(): void {
    this.deliveryNoteService
      .save({
        gross: this.total,
        paidStatus: this.deliveryNoteForm.get(FormControlNames.PAID_STATUS)
          ?.value,
        dateOfDeliveryNote: moment(
          this.deliveryNoteForm.get(FormControlNames.DATE_OF_DELIVERY_NOTE)
            ?.value
        ).format("YYYY-MM-DD"),
        listOfArticles: this.listOfSelectedArticles,
        idClient:
          this.deliveryNoteForm.get(FormControlNames.ID_CLIENT)?.value !== ""
            ? this.deliveryNoteForm.get(FormControlNames.ID_CLIENT)?.value
            : null,
      })
      .subscribe(
        (resp) => {
          SnackBarUtil.openSnackBar(this.snackBar, "Uspešno");
          this.articleStore.dispatch(new GetArticleAction());
          this.updateDeliveryNoteBS.setValueForUpdateDeliveryNoteBehaviorSubject(
            true
          );
        },
        () => {
          SnackBarUtil.openSnackBar(this.snackBar, "Dogodila se greška");
        }
      );
  }

  searchForArticle() {
    this.searchForm
      .get(FormControlNames.SEARCH)
      ?.valueChanges.pipe(
        filter((inputValue) => {
          if (inputValue.length > 2) {
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

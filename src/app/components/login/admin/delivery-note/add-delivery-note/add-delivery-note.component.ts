import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ClientState } from "../../../../../store/reducers/client.reducer";
import { ArticleState } from "../../../../../store/reducers/article.reducer";
import { FieldConfig } from "../../../../../util/form-components/models/FieldConfig";
import { DeliveryNoteStatusEnum } from "../../../../../enum/DeliveryNoteStatusEnum";
import { FormControlNames } from "../../../../../constant/constant";
import { SelectedArticleDto } from "../../../../../models/dto/SelectedArticleDto";

@Component({
  selector: "app-add-delivery-note",
  templateUrl: "./add-delivery-note.component.html",
  styleUrls: ["./add-delivery-note.component.sass"],
})
export class AddDeliveryNoteComponent implements OnInit {
  public total = 0;
  listOfSelectedArticles: SelectedArticleDto[] = [];

  listOfArticles = this.articleStore.select((state) => state.articles.list);

  articleTableDisplayedColumns: string[] = [
    "code",
    "name",
    "price",
    "amount",
    "quantity",
  ];

  public listOfClients$ = this.clientStore.select((state) => state.client.list);

  deliveryNoteForm = new FormGroup({
    idClient: new FormControl(""),
    paidStatus: new FormControl(""),
    gross: new FormControl(this.total, Validators.required),
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
    }>
  ) {}

  ngOnInit(): void {}

  addArticle(article: SelectedArticleDto | any): void {
    let isArticleExistingInArray: SelectedArticleDto | undefined =
      this.listOfSelectedArticles.find((item) => article.id === item.id);
    const index = this.listOfSelectedArticles.findIndex(
      (item) => article.id === item.id
    );

    const amountValue = Number.parseInt(
      this.amountForm.get(FormControlNames.AMOUNT)?.value
    );
    if (isArticleExistingInArray) {
      this.listOfSelectedArticles[index].amount += amountValue;
      this.listOfSelectedArticles[index].total +=
        amountValue * article.sellingPrice;
    } else {
      this.listOfSelectedArticles.push({
        id: article.id,
        code: article.code,
        amount: amountValue,
        total: amountValue * article.sellingPrice,
        sellingPrice: article.sellingPrice,
        name: article.name,
      });
    }

    this.total += article.sellingPrice;
  }

  removeArticle(article: SelectedArticleDto | any): void {
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
}
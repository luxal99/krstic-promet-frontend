import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ClientState } from "../../../../../store/reducers/client.reducer";
import { ArticleState } from "../../../../../store/reducers/article.reducer";
import { FieldConfig } from "../../../../../util/form-components/models/FieldConfig";
import { DeliveryNoteStatusEnum } from "../../../../../enum/DeliveryNoteStatusEnum";
import { FormControlNames } from "../../../../../constant/constant";
import { Article } from "../../../../../models/article";

@Component({
  selector: "app-add-delivery-note",
  templateUrl: "./add-delivery-note.component.html",
  styleUrls: ["./add-delivery-note.component.sass"],
})
export class AddDeliveryNoteComponent implements OnInit {
  public total = 0;
  listOfSelectedArticles: Article[] = [];

  listOfArticles = this.articleStore.select((state) => state.articles.list);

  articleTableDisplayedColumns: string[] = [
    "code",
    "name",
    "price",
    "quantity",
  ];

  public listOfClients$ = this.clientStore.select((state) => state.client.list);

  deliveryNoteForm = new FormGroup({
    idClient: new FormControl(""),
    paidStatus: new FormControl(""),
    gross: new FormControl(this.total, Validators.required),
    dateOfDeliveryNote: new FormControl(new Date(), Validators.required),
  });
  searchForm = new FormGroup({
    search: new FormControl(""),
  });

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

  addArticle(article: Article): void {
    this.listOfSelectedArticles.push(article);
    this.total += article.sellingPrice;
  }

  removeArticle(article: Article): void {
    this.listOfSelectedArticles.splice(
      this.listOfSelectedArticles.indexOf(article),
      1
    );
    this.total -= article.sellingPrice;
  }
}

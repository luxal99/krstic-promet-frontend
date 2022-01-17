import { Component, Input, OnInit } from "@angular/core";
import { ARTICLE_TABLE } from "../../../../../constant/table-config/table-config";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { ArticleState } from "../../../../../store/reducers/article.reducer";
import { map } from "rxjs/operators";
import { FormBuilderConfig } from "../../../../../util/form-components/models/FormBuilderConfig";
import { FormControlNames } from "../../../../../constant/constant";
import { Validators } from "@angular/forms";
import { articleStoreConfig } from "../../../../../store/config/StoreConfig";
import { ArticleSubCategoryState } from "../../../../../store/reducers/article-sub-category.reducer";
import { WarehouseState } from "../../../../../store/reducers/warehouse.reducer";
import { openDialog } from "../../../../../util/modal/OpeningModal";
import { FormBuilderComponent } from "../../../../../util/form-components/form-builder/form-builder.component";
import { setDialogConfig } from "../../../../../util/modal/DialogConfig";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorService } from "../../../../../service/util/behavior.service";
import { ConversionState } from "../../../../../store/reducers/conversion.reducer";

@Component({
  selector: "app-article-list-view",
  templateUrl: "./article-list-view.component.html",
  styleUrls: ["./article-list-view.component.sass"],
})
export class ArticleListViewComponent implements OnInit {
  @Input() behaviorService!: BehaviorService;
  listOfArticle$: Observable<any> = this.articleStore.select(
    (state) => state.articles.list
  );
  listOfArticleSubCategories$: Observable<any> =
    this.articleSubCategoryStore.select(
      (state) => state.articleSubCategory.list
    );
  listOfWarehouses$: Observable<any> = this.warehouseStore.select(
    (state) => state.warehouse.list
  );

  listOfConversions$: Observable<any> = this.conversionStore.select(
    (state) => state.conversion.list
  );

  articleTableConfig = ARTICLE_TABLE;

  constructor(
    private articleStore: Store<{ articles: ArticleState }>,
    private articleSubCategoryStore: Store<{
      articleSubCategory: ArticleSubCategoryState;
    }>,
    private conversionStore: Store<{
      conversion: ConversionState;
    }>,
    private warehouseStore: Store<{ warehouse: WarehouseState }>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getQuery();
    this.initArticleSubCategorySelect();
    this.initWarehouseSelect();
    this.initConversionSelect();
  }

  getQuery() {
    if (this.behaviorService) {
      const id = this.behaviorService.get();
      if (
        this.behaviorService.constructor.name === "WarehouseBehaviorService"
      ) {
        this.listOfArticle$ = this.listOfArticle$.pipe(
          map((value) =>
            value.filter((item: any) => item.idWarehouse.id === id)
          )
        );
      } else if (
        this.behaviorService.constructor.name ===
        "ArticleSubCategoryBehaviorService"
      ) {
        this.listOfArticle$ = this.listOfArticle$.pipe(
          map((value) =>
            value.filter((item: any) => item.idArticleSubCategory.id === id)
          )
        );
      }
    }
  }

  openAddDialog() {
    openDialog(
      FormBuilderComponent,
      setDialogConfig({
        width: "30%",
        data: this.articleDialogConfig,
      }),
      this.dialog
    )
      .afterClosed()
      .subscribe(() => {});
  }

  initArticleSubCategorySelect() {
    this.listOfArticleSubCategories$.subscribe((resp) => {
      this.articleDialogConfig.formFields[5].options = resp;
    });
  }

  initWarehouseSelect() {
    this.listOfWarehouses$.subscribe((resp) => {
      this.articleDialogConfig.formFields[6].options = resp;
    });
  }

  initConversionSelect() {
    this.listOfConversions$.subscribe((resp) => {
      this.articleDialogConfig.formFields[7].options = resp;
    });
  }

  articleDialogConfig: FormBuilderConfig = {
    formFields: [
      {
        name: FormControlNames.NAME,
        type: "input",
        icon: "format_align_right",
        validation: [Validators.required],
        label: "Naziv",
        bindValue: "",
      },
      {
        name: FormControlNames.CODE,
        type: "input",
        icon: "vpn_key",
        validation: [Validators.required],
        label: "Šifra",
        bindValue: "",
      },
      {
        name: FormControlNames.PURCHASE_PRICE,
        type: "input",
        value: "number",
        icon: "credit_card",
        validation: [Validators.required],
        label: "Nabavna cena",
        bindValue: "",
      },
      {
        name: FormControlNames.SELLING_PRICE,
        type: "input",
        value: "number",
        icon: "credit_card",
        validation: [Validators.required],
        label: "Prodajna cena",
        bindValue: "",
      },
      {
        name: FormControlNames.AMOUNT,
        type: "input",
        value: "number",
        icon: "inventory_2",
        validation: [Validators.required],
        label: "Na stanju",
        bindValue: "",
      },
      {
        name: FormControlNames.ID_ARTICLE_SUB_CATEGORY,
        type: "select",
        validation: [Validators.required],
        label: "Potkategorija",
        bindValue: "title",
      },
      {
        name: FormControlNames.ID_WAREHOUSE,
        type: "select",
        validation: [Validators.required],
        label: "Magacin",
        bindValue: "name",
      },
      {
        name: FormControlNames.ID_CONVERSION,
        type: "select",
        label: "Konverzija",
        bindValue: "conversionToValue",
      },
    ],
    headerText: "Dodaj artikl",
    store: this.articleStore,
    storeConfig: articleStoreConfig,
  };
}

import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { ARTICLE_TABLE } from "../../../../../constant/table-config/table-config";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { ArticleState } from "../../../../../store/reducers/article.reducer";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from "rxjs/operators";
import { FormBuilderConfig } from "../../../../../util/form-components/models/FormBuilderConfig";
import { FormControlNames } from "../../../../../constant/constant";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { articleStoreConfig } from "../../../../../store/config/StoreConfig";
import { ArticleSubCategoryState } from "../../../../../store/reducers/article-sub-category.reducer";
import { WarehouseState } from "../../../../../store/reducers/warehouse.reducer";
import { openDialog } from "../../../../../util/modal/OpeningModal";
import { FormBuilderComponent } from "../../../../../util/form-components/form-builder/form-builder.component";
import { setDialogConfig } from "../../../../../util/modal/DialogConfig";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorService } from "../../../../../service/util/behavior.service";
import { ConversionState } from "../../../../../store/reducers/conversion.reducer";
import { openConfirmDialog } from "../../../../../util/confirm-dialog/config/confirm-dialog-config";
import { FieldConfig } from "../../../../../util/form-components/models/FieldConfig";
import { ArticleService } from "../../../../../service/article.service";
import { SpinnerService } from "../../../../../util/spinner/spinner.service";
import { MatSpinner } from "@angular/material/progress-spinner";
import { ResponsiveService } from "../../../../../service/util/responsive.service";
import { BehaviorFilterModel } from "../../../../../service/util/model/BehaviorFilterModel";
import { ClientService } from "../../../../../service/client.service";

@Component({
  selector: "app-article-list-view",
  templateUrl: "./article-list-view.component.html",
  styleUrls: ["./article-list-view.component.sass"],
})
export class ArticleListViewComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @ViewChild("options")
  options!: TemplateRef<any>;

  @ViewChild("spinner")
  spinner!: MatSpinner;

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

  searchForm = new FormGroup({
    search: new FormControl(""),
  });

  searchInputConfig: FieldConfig = {
    name: FormControlNames.SEARCH,
    type: "input",
    bindValue: "",
    label: "Pretraži",
  };

  constructor(
    private articleStore: Store<{ articles: ArticleState }>,
    private articleSubCategoryStore: Store<{
      articleSubCategory: ArticleSubCategoryState;
    }>,
    private conversionStore: Store<{
      conversion: ConversionState;
    }>,
    private warehouseStore: Store<{ warehouse: WarehouseState }>,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private articleService: ArticleService,
    private spinnerService: SpinnerService,
    public responsiveService: ResponsiveService,
    private behaviorService: BehaviorService
  ) {}

  ngOnInit(): void {
    this.initArticleSubCategorySelect();
    this.initWarehouseSelect();
    this.initConversionSelect();
  }

  ngAfterViewInit(): void {
    this.articleTableConfig = [
      ...this.articleTableConfig,
      {
        name: "option",
        value: "",
        templateRef: this.options,
        columnType: "CUSTOM",
        displayedName: "",
      },
    ];
    this.getQuery();
    this.searchForArticle();
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  getQuery() {
    if (this.behaviorService.get().filterType) {
      const filterModel: BehaviorFilterModel = this.behaviorService.get();
      switch (filterModel.filterType) {
        case "WAREHOUSE":
          this.listOfArticle$ = this.listOfArticle$.pipe(
            map((value) =>
              value.filter(
                (item: any) => item.idWarehouse.id === filterModel.id
              )
            )
          );
          break;
        case "ARTICLE_SUB_CATEGORY":
          this.listOfArticle$ = this.listOfArticle$.pipe(
            map((value) =>
              value.filter(
                (item: any) => item.idArticleSubCategory.id === filterModel.id
              )
            )
          );
          break;
      }
    }
  }

  openAddDialog(data?: any) {
    if (data) {
      this.articleDialogConfig.formValues = data;
    }
    openDialog(
      FormBuilderComponent,
      setDialogConfig({
        width: "30%",
        height: "80vh",
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
        bindValue: "name",
      },
      {
        name: FormControlNames.PRICE_TYPE,
        type: "select",
        label: "Tip cene",
        bindValue: "",
        options: ["PER_UNIT", "PER_PIECE"],
      },
    ],
    headerText: "Dodaj artikl",
    store: this.articleStore,
    storeConfig: articleStoreConfig,
  };

  delete(id: any): void {
    openConfirmDialog(this.dialog, () => {
      this.articleDialogConfig.store?.dispatch(
        new this.articleDialogConfig.storeConfig.deleteAction(id)
      );
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
            return inputValue;
          }
        }),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((resp) => {
        if (resp.length > 1) {
          this.listOfArticle$ = this.articleService.searchForRealEstate(resp);
          this.spinnerService.hide(this.spinner);
        } else {
          this.listOfArticle$ = this.articleStore.select(
            (state) => state.articles.list
          );
        }
      });
  }
}

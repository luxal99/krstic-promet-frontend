import {Component, OnInit} from "@angular/core";
import {FormBuilderConfig} from "../../../../util/form-components/models/FormBuilderConfig";
import {Store} from "@ngrx/store";
import {ArticleState} from "../../../../store/reducers/article.reducer";
import {articleStoreConfig} from "../../../../store/config/StoreConfig";
import {Observable} from "rxjs";
import { ARTICLE_TABLE} from "../../../../constant/table-config/table-config";
import {FormControlNames} from "../../../../constant/constant";
import {Validators} from "@angular/forms";
import {WarehouseState} from "../../../../store/reducers/warehouse.reducer";
import {ArticleSubCategoryState} from "../../../../store/reducers/article-sub-category.reducer";

@Component({
    selector: "app-articles",
    templateUrl: "./articles.component.html",
    styleUrls: ["./articles.component.sass"]
})
export class ArticlesComponent implements OnInit {

    listOfArticle$: Observable<any> = this.articleStore.select(state => state.articles.list);
    listOfArticleSubCategories$: Observable<any> = this.articleSubCategoryStore.select(state => state.articleSubCategory.list);
    listOfWarehouses$: Observable<any> = this.warehouseStore.select(state => state.warehouse.list);

    articleTableConfig = ARTICLE_TABLE;

    constructor(private articleStore: Store<{ articles: ArticleState }>,
                private warehouseStore: Store<{ warehouse: WarehouseState }>,
                private articleSubCategoryStore: Store<{ articleSubCategory: ArticleSubCategoryState }>) {
    }

    ngOnInit(): void {
        this.initArticleSubCategorySelect();
        this.initWarehouseSelect();
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


    articleDialogConfig: FormBuilderConfig = {
        formFields: [
            {
                name: FormControlNames.NAME,
                type: "input",
                icon:"format_align_right",
                validation: [Validators.required],
                label: "Naziv",
                bindValue: ""
            },
            {
                name: FormControlNames.CODE,
                type: "input",
                icon:"vpn_key",
                validation: [Validators.required],
                label: "Šifra",
                bindValue: ""
            },
            {
                name: FormControlNames.PURCHASE_PRICE,
                type: "input",
                value:"number",
                icon:"credit_card",
                validation: [Validators.required],
                label: "Nabavna cena",
                bindValue: ""
            },
            {
                name: FormControlNames.SELLING_PRICE,
                type: "input",
                value:"number",
                icon:"credit_card",
                validation: [Validators.required],
                label: "Prodajna cena",
                bindValue: ""
            },
            {
                name: FormControlNames.AMOUNT,
                type: "input",
                value:"number",
                icon:"inventory_2",
                validation: [Validators.required],
                label: "Na stanju",
                bindValue: ""
            },
            {
                name: FormControlNames.ID_ARTICLE_SUB_CATEGORY,
                type: "select",
                validation: [Validators.required],
                label: "Potkategorija",
                bindValue: "title"
            },
            {
                name: FormControlNames.ID_WAREHOUSE,
                type: "select",
                validation: [Validators.required],
                label: "Magacin",
                bindValue: "name"
            },
            {
                name: FormControlNames.ID_CONVERSION,
                type: "select",
                label: "Konverzija",
                bindValue: ""
            },

        ],
        headerText: "Dodaj artikl",
        store: this.articleStore,
        storeConfig: articleStoreConfig
    };

}

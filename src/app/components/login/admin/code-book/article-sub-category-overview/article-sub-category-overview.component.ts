import {Component, OnInit} from "@angular/core";
import {ARTICLE_SUB_CATEGORY_TABLE} from "../../../../../constant/table-config/table-config";
import {FormBuilderConfig} from "../../../../../util/form-components/models/FormBuilderConfig";
import {FormControlNames} from "../../../../../constant/constant";
import {Validators} from "@angular/forms";
import {ArticleSubCategory} from "../../../../../models/article-sub-category";
import {ArticleSubCategoryService} from "../../../../../service/article-sub-category.service";

@Component({
    selector: "app-article-sub-category-overview",
    templateUrl: "./article-sub-category-overview.component.html",
    styleUrls: ["./article-sub-category-overview.component.sass"]
})
export class ArticleSubCategoryOverviewComponent implements OnInit {

    listOfArticleSubCategories: ArticleSubCategory[] = [];

    articleSubCategoryTableConfig = ARTICLE_SUB_CATEGORY_TABLE;

    constructor(private articleSubCategoryService: ArticleSubCategoryService) {
    }

    ngOnInit(): void {
        this.getAll();
    }

    getAll(): void {
        this.articleSubCategoryService.getAll().subscribe((resp) => {
            this.listOfArticleSubCategories = resp;
        });
    }

    articleSubCategoryDialogConfig: FormBuilderConfig = {
        formFields: [
            {
                name: FormControlNames.TITLE,
                type: "input",
                validation: [Validators.required],
                label: "Naziv",
                bindValue: ""
            },
            {
                name: FormControlNames.ID_ARTICLE_CATEGORY,
                type: "select",
                validation: [Validators.required],
                label: "Kategorija artikla",
                bindValue: "title"
            }
        ],
        headerText: "Dodaj kategoriju artikla",
        service: this.articleSubCategoryService
    };
}

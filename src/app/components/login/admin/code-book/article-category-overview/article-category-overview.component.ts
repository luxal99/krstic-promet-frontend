import {Component, OnInit} from "@angular/core";
import {ArticleCategoryService} from "../../../../../service/article-category.service";
import {ArticleCategory} from "../../../../../models/article-category";
import {FormControlNames} from "../../../../../constant/constant";
import {Validators} from "@angular/forms";
import {FormBuilderConfig} from "../../../../../util/form-components/models/FormBuilderConfig";
import {ARTICLE_CATEGORY_TABLE} from "../../../../../constant/table-config/table-config";

@Component({
    selector: "app-article-category-overview",
    templateUrl: "./article-category-overview.component.html",
    styleUrls: ["./article-category-overview.component.sass"]
})
export class ArticleCategoryOverviewComponent implements OnInit {

    listOfArticleCategories: ArticleCategory[] = [];

    articleCategoryTableConfig = ARTICLE_CATEGORY_TABLE;

    constructor(private articleCategoryService: ArticleCategoryService) {
    }

    ngOnInit(): void {
        this.getAll();
    }

    getAll(): void {
        this.articleCategoryService.getAll().subscribe((resp) => {
            this.listOfArticleCategories = resp;
        });
    }

    articleCategoryDialogConfig: FormBuilderConfig = {
        formFields: [{
            name: FormControlNames.TITLE,
            type: "input",
            validation: [Validators.required],
            label: "Naziv",
            bindValue: ""
        }],
        headerText: "Dodaj kategoriju artikla",
        service: this.articleCategoryService
    };

}

import {Component, OnInit} from "@angular/core";
import {ArticleCategoryService} from "../../../../../service/article-category.service";
import {FormControlNames} from "../../../../../constant/constant";
import {Validators} from "@angular/forms";
import {FormBuilderConfig} from "../../../../../util/form-components/models/FormBuilderConfig";
import {ARTICLE_CATEGORY_TABLE} from "../../../../../constant/table-config/table-config";
import {Store} from "@ngrx/store";
import {ArticleCategoryState} from "../../../../../store/reducers/real-estate-category.reducer";
import {Observable} from "rxjs";

@Component({
    selector: "app-article-category-overview",
    templateUrl: "./article-category-overview.component.html",
    styleUrls: ["./article-category-overview.component.sass"]
})
export class ArticleCategoryOverviewComponent implements OnInit {

     listOfArticleCategories$: Observable<any> = this.articleCategoryStore.select(state => state.articleCategory.list);

    articleCategoryTableConfig = ARTICLE_CATEGORY_TABLE;

    constructor(private articleCategoryService: ArticleCategoryService,
                private articleCategoryStore: Store<{ articleCategory: ArticleCategoryState }>) {
    }

    ngOnInit(): void {

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

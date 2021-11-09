import {Component, OnInit} from "@angular/core";
import {ARTICLE_SUB_CATEGORY_TABLE} from "../../../../../constant/table-config/table-config";
import {FormBuilderConfig} from "../../../../../util/form-components/models/FormBuilderConfig";
import {FormControlNames} from "../../../../../constant/constant";
import {Validators} from "@angular/forms";
import {ArticleSubCategory} from "../../../../../models/article-sub-category";
import {ArticleSubCategoryService} from "../../../../../service/article-sub-category.service";
import {Store} from "@ngrx/store";
import {ArticleCategoryState} from "../../../../../store/reducers/article-category.reducer";
import {Observable} from "rxjs";

@Component({
    selector: "app-article-sub-category-overview",
    templateUrl: "./article-sub-category-overview.component.html",
    styleUrls: ["./article-sub-category-overview.component.sass"]
})
export class ArticleSubCategoryOverviewComponent implements OnInit {

    listOfArticleSubCategories: ArticleSubCategory[] = [];
    listOfArticleCategories: Observable<any> = this.articleCategoryStore.select(state => state.articleCategory.list);

    articleSubCategoryTableConfig = ARTICLE_SUB_CATEGORY_TABLE;

    constructor(private articleSubCategoryService: ArticleSubCategoryService,
                private articleCategoryStore: Store<{ articleCategory: ArticleCategoryState }>) {
    }

    ngOnInit(): void {
        this.initArticleCategorySelect()
    }

    initArticleCategorySelect(){
        this.listOfArticleCategories.subscribe((resp)=>{
            this.articleSubCategoryDialogConfig.formFields[1].options = resp
        })
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

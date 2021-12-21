import {Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewContainerRef} from "@angular/core";
import {Observable} from "rxjs";
import {FormBuilderConfig} from "../../../../../util/form-components/models/FormBuilderConfig";
import {Store} from "@ngrx/store";
import {loadComponent} from "../../../../../util/components-util/lazy-load-component";
import {ArticleCategoryBehaviorService} from "../../../../../service/util/article-category-behavior.service";
import {ArticleSubCategoryGridViewComponent} from "../article-sub-category-grid-view/article-sub-category-grid-view.component";
import {ArticleCategoryState} from "../../../../../store/reducers/article-category.reducer";
import {map} from "rxjs/operators";

@Component({
    selector: "app-article-category-grid-view",
    templateUrl: "./article-category-grid-view.component.html",
    styleUrls: ["./article-category-grid-view.component.sass"]
})
export class ArticleCategoryGridViewComponent implements OnInit {

    @Input() entry!: ViewContainerRef;
    listOfArticleCategories$: Observable<any> = this.articleCategory.select(state => state.articleCategory.list);
    @Input() tableConfig!: FormBuilderConfig;

    constructor(private articleCategory: Store<{ articleCategory: ArticleCategoryState }>,
                private resolver: ComponentFactoryResolver,
                private articleCategoryBehaviorService: ArticleCategoryBehaviorService) {
    }

    ngOnInit(): void {
    }

    loadArticleSubCategoryView(): void {
        const articleSubCategoryGridViewComponentComponentRef: ComponentRef<ArticleSubCategoryGridViewComponent> = loadComponent(ArticleSubCategoryGridViewComponent, this.entry, this.resolver);
        articleSubCategoryGridViewComponentComponentRef.instance.entry = this.entry;
    }

    selectArticleCategory(id: number) {
        this.articleCategoryBehaviorService.add(id);
        this.loadArticleSubCategoryView();
    }
}

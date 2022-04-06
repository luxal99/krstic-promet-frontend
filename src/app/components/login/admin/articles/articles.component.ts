import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { ArticleState } from "../../../../store/reducers/article.reducer";
import { WarehouseState } from "../../../../store/reducers/warehouse.reducer";
import { loadComponent } from "../../../../util/components-util/lazy-load-component";
import { ArticleGridWarehouseViewComponent } from "./article-grid-warehouse-view/article-grid-warehouse-view.component";
import { ArticleListViewComponent } from "./article-list-view/article-list-view.component";
import { MatDialog } from "@angular/material/dialog";
import { ArticleCategoryGridViewComponent } from "./article-category-grid-view/article-category-grid-view.component";
import { BehaviorService } from "../../../../service/util/behavior.service";
import { GetArticleAction } from "../../../../store/actions/article.actions";

@Component({
  selector: "app-articles",
  templateUrl: "./articles.component.html",
  styleUrls: ["./articles.component.sass"],
})
export class ArticlesComponent implements OnInit {
  @ViewChild("articles", { read: ViewContainerRef, static: false })
  entry!: ViewContainerRef;

  constructor(
    private articleStore: Store<{ articles: ArticleState }>,
    private warehouseStore: Store<{ warehouse: WarehouseState }>,
    private resolver: ComponentFactoryResolver,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private behaviorService: BehaviorService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      const articleListViewComponentComponentRef: ComponentRef<ArticleListViewComponent> =
        loadComponent(ArticleListViewComponent, this.entry, this.resolver);
    }, 100);
  }

  loadArticleListView(): void {
    this.behaviorService.reset();
    this.articleStore.dispatch(new GetArticleAction({ page: 0, rows: 10 }));
    const articleListViewComponentComponentRef: ComponentRef<ArticleListViewComponent> =
      loadComponent(ArticleListViewComponent, this.entry, this.resolver);
  }

  loadArticleWarehouseView(): void {
    const warehouseGrid: ComponentRef<ArticleGridWarehouseViewComponent> =
      loadComponent(
        ArticleGridWarehouseViewComponent,
        this.entry,
        this.resolver
      );
    warehouseGrid.instance.entry = this.entry;
  }

  loadArticleCategoryView(): void {
    const articleCategoryGridViewComponentComponentRef: ComponentRef<ArticleCategoryGridViewComponent> =
      loadComponent(
        ArticleCategoryGridViewComponent,
        this.entry,
        this.resolver
      );
    articleCategoryGridViewComponentComponentRef.instance.entry = this.entry;
  }
}

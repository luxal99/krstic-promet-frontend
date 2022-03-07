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
import { WarehouseBehaviorService } from "../../../../service/util/warehouse-behavior.service";
import { ArticleCategoryGridViewComponent } from "./article-category-grid-view/article-category-grid-view.component";

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
    private warehouseBehaviorService: WarehouseBehaviorService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadArticleListView();
    }, 100);
  }

  loadArticleListView(): void {
    this.warehouseBehaviorService.reset();
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

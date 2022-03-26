import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  ViewContainerRef,
} from "@angular/core";
import { Observable } from "rxjs";
import { FormBuilderConfig } from "../../../../../util/form-components/models/FormBuilderConfig";
import { Store } from "@ngrx/store";
import { WarehouseState } from "../../../../../store/reducers/warehouse.reducer";
import { loadComponent } from "../../../../../util/components-util/lazy-load-component";
import { ArticleListViewComponent } from "../article-list-view/article-list-view.component";
import { map } from "rxjs/operators";
import { BehaviorService } from "../../../../../service/util/behavior.service";
import { BehaviorFilterModel } from "../../../../../service/util/model/BehaviorFilterModel";

@Component({
  selector: "app-article-sub-category-grid-view",
  templateUrl: "./article-sub-category-grid-view.component.html",
  styleUrls: ["./article-sub-category-grid-view.component.sass"],
})
export class ArticleSubCategoryGridViewComponent implements OnInit {
  @Input() entry!: ViewContainerRef;
  listOfArticleSubCategories$: Observable<any> = this.articleSubCategory.select(
    (state) => state.articleSubCategory.list
  );
  @Input() tableConfig!: FormBuilderConfig;

  constructor(
    private articleSubCategory: Store<{ articleSubCategory: WarehouseState }>,
    private resolver: ComponentFactoryResolver,
    private behaviorService: BehaviorService
  ) {}

  ngOnInit(): void {
    this.filterArticleCategories();
  }

  filterArticleCategories() {
    const filterData: BehaviorFilterModel = this.behaviorService.get();
    this.listOfArticleSubCategories$ = this.listOfArticleSubCategories$.pipe(
      map((value) =>
        value.filter((item: any) => item.idArticleCategory.id === filterData.id)
      )
    );
  }

  loadArticleSubCategoryView(): void {
    const articleListViewComponentComponentRef: ComponentRef<ArticleListViewComponent> =
      loadComponent(ArticleListViewComponent, this.entry, this.resolver);
  }

  selectArticleSubCategory(id: number) {
    this.behaviorService.add({ id, filterType: "ARTICLE_SUB_CATEGORY" });
    this.loadArticleSubCategoryView();
  }
}

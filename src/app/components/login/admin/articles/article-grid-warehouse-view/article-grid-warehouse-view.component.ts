import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  ViewContainerRef,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { WarehouseState } from "../../../../../store/reducers/warehouse.reducer";
import { WarehouseBehaviorService } from "../../../../../service/util/warehouse-behavior.service";
import { loadComponent } from "../../../../../util/components-util/lazy-load-component";
import { ArticleListViewComponent } from "../article-list-view/article-list-view.component";

@Component({
  selector: "app-article-grid-warehouse-view",
  templateUrl: "./article-grid-warehouse-view.component.html",
  styleUrls: ["./article-grid-warehouse-view.component.sass"],
})
export class ArticleGridWarehouseViewComponent implements OnInit {
  @Input() entry!: ViewContainerRef;
  listOfWarehouses$: Observable<any> = this.warehouseStore.select(
    (state) => state.warehouse.list
  );

  constructor(
    private warehouseStore: Store<{ warehouse: WarehouseState }>,
    private resolver: ComponentFactoryResolver,
    private warehouseBehaviorService: WarehouseBehaviorService
  ) {}

  ngOnInit(): void {}

  selectWarehouse(id: number) {
    this.warehouseBehaviorService.add(id);
    this.loadArticleWarehouseView();
  }

  loadArticleWarehouseView(): void {
    const articleListViewComponentComponentRef: ComponentRef<ArticleListViewComponent> =
      loadComponent(ArticleListViewComponent, this.entry, this.resolver);
    articleListViewComponentComponentRef.instance.behaviorService =
      this.warehouseBehaviorService;
  }
}

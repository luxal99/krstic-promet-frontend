import {Component, OnInit} from "@angular/core";
import {ARTICLE_TABLE} from "../../../../../constant/table-config/table-config";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {ArticleState} from "../../../../../store/reducers/article.reducer";
import {WarehouseBehaviorService} from "../../../../../service/util/warehouse-behavior.service";
import {WarehouseService} from "../../../../../service/warehouse.service";
import {map} from "rxjs/operators";

@Component({
    selector: "app-article-list-view",
    templateUrl: "./article-list-view.component.html",
    styleUrls: ["./article-list-view.component.sass"]
})
export class ArticleListViewComponent implements OnInit {

    listOfArticle$: Observable<any> = this.articleStore.select(state => state.articles.list);


    articleTableConfig = ARTICLE_TABLE;

    constructor(private articleStore: Store<{ articles: ArticleState }>,
                private warehouseBehaviorService: WarehouseBehaviorService,
                private warehouseService: WarehouseService) {
    }

    ngOnInit(): void {
        this.getQuery();
    }

    getQuery() {
        const idWarehouse = this.warehouseBehaviorService.get();
        if (idWarehouse > 0) {
            this.listOfArticle$ = this.listOfArticle$.pipe(map(value => value.filter((item: any) => item.idWarehouse.id === idWarehouse)));
        }
    }

}

import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { ComponentType } from "@angular/cdk/portal";
import { MatDrawer } from "@angular/material/sidenav";
import { loadComponent } from "../../../util/components-util/lazy-load-component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CodeBookComponent } from "./code-book/code-book.component";
import { Store } from "@ngrx/store";
import { GetArticleCategoryAction } from "../../../store/actions/article-category.actions";
import { GetArticleSubCategoryAction } from "../../../store/actions/article-sub-category.actions";
import { GetWarehouseAction } from "../../../store/actions/warehouse.actions";
import { ArticlesComponent } from "./articles/articles.component";
import { GetArticleAction } from "../../../store/actions/article.actions";
import { DeliveryNoteComponent } from "./delivery-note/delivery-note.component";
import { GetConversionAction } from "../../../store/actions/conversion.actions";
import { ClientComponent } from "./client/client.component";
import { GetClientAction } from "../../../store/actions/client.actions";
import { ResponsiveService } from "../../../service/util/responsive.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.sass"],
})
export class AdminComponent implements OnInit {
  @ViewChild("drawer") drawer!: MatDrawer;
  isMobile = window.screen.width <= 570;
  @ViewChild("target", { read: ViewContainerRef, static: false })
  entry!: ViewContainerRef;
  header = "Pregled";

  constructor(
    private resolver: ComponentFactoryResolver,
    private store: Store<any>,
    public responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.initDefaultMenu();
    }, 100);
    this.store.dispatch(new GetArticleCategoryAction());
    this.store.dispatch(new GetArticleSubCategoryAction());
    this.store.dispatch(new GetWarehouseAction());
    this.store.dispatch(new GetArticleAction({ rows: 10, page: 0 }));
    this.store.dispatch(new GetConversionAction());
    this.store.dispatch(new GetClientAction({ rows: 10, page: 0 }));
  }

  initDefaultMenu(): void {
    // @ts-ignore
    const element = document.getElementById("overview-btn");
    if (element) {
      element.click();
    }
  }

  loadDashboardComponent(): void {
    this.header = "Pregled";
    this.lazyLoad(DashboardComponent);
  }

  loadArticlesComponent(): void {
    this.header = "Artikli";
    this.lazyLoad(ArticlesComponent);
  }

  loadClient(): void {
    this.header = "Klijenti";
    this.lazyLoad(ClientComponent);
  }

  loadDeliveryNote(): void {
    this.header = "Otpremnice";
    this.lazyLoad(DeliveryNoteComponent);
  }

  changeColor(e: any): void {
    const element = document.querySelectorAll(".active");
    [].forEach.call(element, (el: any) => {
      el.classList.remove("active");
      el.classList.add("inactive");
    });
    e.target.className = "active";
  }

  lazyLoad(component: ComponentType<any>): void {
    if (this.isMobile && this.drawer.opened) {
      this.drawer.toggle().then(() => {
        loadComponent(component, this.entry, this.resolver);
      });
    } else {
      loadComponent(component, this.entry, this.resolver);
    }
  }

  loadCodeBook() {
    this.header = "Šifarnik";
    this.lazyLoad(CodeBookComponent);
  }
}

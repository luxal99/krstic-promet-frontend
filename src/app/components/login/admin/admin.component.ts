import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {ComponentType} from "@angular/cdk/portal";
import {MatDrawer} from "@angular/material/sidenav";
import {loadComponent} from "../../../util/components-util/lazy-load-component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CodeBookComponent} from "./code-book/code-book.component";
import {Store} from "@ngrx/store";
import {GetArticleCategoryAction} from "../../../store/actions/article-category.actions";
import {GetArticleSubCategoryAction} from "../../../store/actions/article-sub-category.actions";

@Component({
    selector: "app-admin",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.sass"]
})
export class AdminComponent implements OnInit {

    @ViewChild("drawer") drawer!: MatDrawer;
    isMobile = window.screen.width <= 570;
    @ViewChild("target", {read: ViewContainerRef, static: false}) entry!: ViewContainerRef;
    header = "Pregled";

    constructor(private resolver: ComponentFactoryResolver,
                private store: Store<any>) {
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.initDefaultMenu();
        }, 100);
        this.store.dispatch(new GetArticleCategoryAction());
        this.store.dispatch(new GetArticleSubCategoryAction());
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

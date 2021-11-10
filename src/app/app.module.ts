import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material.module";
import {FormModule} from "./util/form-components/form.module";
import {DEFAULT_ROUTE} from "./constant/constant";
import {LoginComponent} from "./components/login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./interceptor/token.interceptor";
import {AdminComponent} from "./components/login/admin/admin.component";
import {ComponentActivatorComponent} from "./util/component-activator/component-activator.component";
import {DashboardComponent} from "./components/login/admin/dashboard/dashboard.component";
import {CodeBookComponent} from "./components/login/admin/code-book/code-book.component";
import {NavbarComponent} from "./components/login/admin/navbar/navbar.component";
import {GenericTableModule} from "./util/table/generic-table/generic-table.module";
import {CodeBookOverviewComponent} from "./components/login/admin/code-book/code-book-overview/code-book-overview.component";
import {ArticleCategoryOverviewComponent} from "./components/login/admin/code-book/article-category-overview/article-category-overview.component";
import {ArticleSubCategoryOverviewComponent} from "./components/login/admin/code-book/article-sub-category-overview/article-sub-category-overview.component";
import {StoreModule} from "@ngrx/store";
import {ArticleCategoryReducer} from "./store/reducers/article-category.reducer";
import {EffectsModule} from "@ngrx/effects";
import {ArticleCategoryEffect} from "./store/effects/article-category.effect";
import {ArticleSubCategoryReducer} from "./store/reducers/article-sub-category.reducer";
import {ArticleSubCategoryEffect} from "./store/effects/article-sub-category.effect";
import {WarehouseOverviewComponent} from "./components/login/admin/code-book/warehouse-overview/warehouse-overview.component";
import {WarehouseReducer} from "./store/reducers/warehouse.reducer";
import {WarehouseEffect} from "./store/effects/warehouse.effect";
import { ArticlesComponent } from './components/login/admin/articles/articles.component';

// @ts-ignore
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AdminComponent,
        ComponentActivatorComponent,
        DashboardComponent,
        CodeBookComponent,
        NavbarComponent,
        CodeBookOverviewComponent,
        ArticleCategoryOverviewComponent,
        ArticleSubCategoryOverviewComponent,
        WarehouseOverviewComponent,
        ArticlesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormModule,
        HttpClientModule,
        GenericTableModule,
        StoreModule.forRoot(
            {
                // @ts-ignore
                articleCategory: ArticleCategoryReducer, articleSubCategory: ArticleSubCategoryReducer,
                // @ts-ignore
                warehouse: WarehouseReducer
            },
        ),
        EffectsModule.forRoot([ArticleCategoryEffect, ArticleSubCategoryEffect, WarehouseEffect])
    ],
    providers: [{provide: DEFAULT_ROUTE, useValue: ""}, {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}

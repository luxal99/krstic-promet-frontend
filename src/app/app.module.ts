import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { FormModule } from "./util/form-components/form.module";
import { DEFAULT_ROUTE } from "./constant/constant";
import { LoginComponent } from "./components/login/login.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./interceptor/token.interceptor";
import { AdminComponent } from "./components/login/admin/admin.component";
import { ComponentActivatorComponent } from "./util/component-activator/component-activator.component";
import { DashboardComponent } from "./components/login/admin/dashboard/dashboard.component";
import { CodeBookComponent } from "./components/login/admin/code-book/code-book.component";
import { NavbarComponent } from "./components/login/admin/navbar/navbar.component";
import { CodeBookOverviewComponent } from "./components/login/admin/code-book/code-book-overview/code-book-overview.component";
import { ArticleCategoryOverviewComponent } from "./components/login/admin/code-book/article-category-overview/article-category-overview.component";
import { ArticleSubCategoryOverviewComponent } from "./components/login/admin/code-book/article-sub-category-overview/article-sub-category-overview.component";
import { StoreModule } from "@ngrx/store";
import { ArticleCategoryReducer } from "./store/reducers/article-category.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ArticleCategoryEffect } from "./store/effects/article-category.effect";
import { ArticleSubCategoryReducer } from "./store/reducers/article-sub-category.reducer";
import { ArticleSubCategoryEffect } from "./store/effects/article-sub-category.effect";
import { WarehouseOverviewComponent } from "./components/login/admin/code-book/warehouse-overview/warehouse-overview.component";
import { WarehouseReducer } from "./store/reducers/warehouse.reducer";
import { WarehouseEffect } from "./store/effects/warehouse.effect";
import { ArticlesComponent } from "./components/login/admin/articles/articles.component";
import { ArticleReducer } from "./store/reducers/article.reducer";
import { ArticleEffect } from "./store/effects/article.effect";
import { ConfirmDialogComponent } from "./util/confirm-dialog/confirm-dialog.component";
import { ArticleListViewComponent } from "./components/login/admin/articles/article-list-view/article-list-view.component";
import { ArticleGridWarehouseViewComponent } from "./components/login/admin/articles/article-grid-warehouse-view/article-grid-warehouse-view.component";
import { ArticleSubCategoryGridViewComponent } from "./components/login/admin/articles/article-sub-category-grid-view/article-sub-category-grid-view.component";
import { ArticleCategoryGridViewComponent } from "./components/login/admin/articles/article-category-grid-view/article-category-grid-view.component";
import { DeliveryNoteComponent } from "./components/login/admin/delivery-note/delivery-note.component";
import { AddDeliveryNoteComponent } from "./components/login/admin/delivery-note/add-delivery-note/add-delivery-note.component";
import { ConversionOverviewComponent } from "./components/login/admin/code-book/conversion-overview/conversion-overview.component";
import { ConversionReducer } from "./store/reducers/conversion.reducer";
import { ConversionEffect } from "./store/effects/conversion.effect";
import { ClientReducer } from "./store/reducers/client.reducer";
import { ClientEffect } from "./store/effects/client.effect";
import { ClientComponent } from "./components/login/admin/client/client.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatChipsModule } from "@angular/material/chips";
import { TranslatePipe } from "./pipes/translate.pipe";
import { PipesModule } from "./pipes/pipes.module";
import { CurrentWeekOverviewComponent } from "./components/login/admin/delivery-note/current-week-overview/current-week-overview.component";
import { CurrentMonthOverviewComponent } from "./components/login/admin/delivery-note/current-month-overview/current-month-overview.component";
import { CustomPeriodOverviewComponent } from "./components/login/admin/delivery-note/custom-period-overview/custom-period-overview.component";
import { GenericDeliveryNoteOverviewComponent } from "./components/login/admin/delivery-note/generic-delivery-note-overview/generic-delivery-note-overview.component";
import { DeliveryNoteOvervireComponent } from "./components/login/admin/delivery-note/delivery-note-overvire/delivery-note-overvire.component";
import { DeliveryNoteOverviewComponent } from "./components/login/admin/delivery-note/delivery-note-overview/delivery-note-overview.component";
import { GenericMaterialTableModule } from "generic-material-table";

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
    ArticlesComponent,
    ConfirmDialogComponent,
    ArticleListViewComponent,
    ArticleGridWarehouseViewComponent,
    ArticleSubCategoryGridViewComponent,
    ArticleCategoryGridViewComponent,
    DeliveryNoteComponent,
    AddDeliveryNoteComponent,
    ConversionOverviewComponent,
    ClientComponent,
    CurrentWeekOverviewComponent,
    CurrentMonthOverviewComponent,
    CustomPeriodOverviewComponent,
    GenericDeliveryNoteOverviewComponent,
    DeliveryNoteOvervireComponent,
    DeliveryNoteOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormModule,
    HttpClientModule,
    GenericMaterialTableModule,
    PipesModule,
    StoreModule.forRoot({
      // @ts-ignore
      articleCategory: ArticleCategoryReducer,
      // @ts-ignore
      articleSubCategory: ArticleSubCategoryReducer,
      // @ts-ignore
      warehouse: WarehouseReducer,
      // @ts-ignore
      articles: ArticleReducer,
      // @ts-ignore
      conversion: ConversionReducer,
      // @ts-ignore
      client: ClientReducer,
    }),
    EffectsModule.forRoot([
      ArticleEffect,
      ArticleCategoryEffect,
      ArticleSubCategoryEffect,
      WarehouseEffect,
      ConversionEffect,
      ClientEffect,
    ]),
    ReactiveFormsModule,
    MatChipsModule,
    FormsModule,
  ],
  providers: [
    { provide: DEFAULT_ROUTE, useValue: "" },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  exports: [TranslatePipe],
})
export class AppModule {}

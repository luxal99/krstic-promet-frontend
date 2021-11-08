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
import { AdminComponent } from './components/login/admin/admin.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AdminComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormModule,
        HttpClientModule
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

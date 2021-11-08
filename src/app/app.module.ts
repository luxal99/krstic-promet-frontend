import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material.module";
import {FormModule} from "./util/form-components/form.module";
import {DEFAULT_ROUTE} from "./constant/constant";
import {LoginComponent} from "./components/login/login.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormModule,
        HttpClientModule
    ],
    providers: [{provide: DEFAULT_ROUTE, useValue: ""}],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import {InjectionToken} from "@angular/core";

export const DEFAULT_ROUTE = new InjectionToken<string>("default-route");
export type Routes = "user" | "article" | "article-category" | "article-sub-category" | "conversion" | "warehouse"

export class FormControlNames {
    static USERNAME = "username";
    static PASSWORD = "password";
}

export const TOKEN_NAME = "Authorization";

export class Pages {
    static ADMIN = "admin";
}

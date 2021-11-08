import {InjectionToken} from "@angular/core";

export const DEFAULT_ROUTE = new InjectionToken<string>("default-route");
export type Routes = "user" | "article" | "article-category" | "article-sub-category" | "conversion" | "warehouse"

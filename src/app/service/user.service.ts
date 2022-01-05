import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Routes } from "../constant/constant";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  ROUTE: Routes = "/user/";

  constructor(private http: HttpClient) {}

  auth(user: User): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(this.ROUTE + "auth", user, {
      observe: "response",
      responseType: "json",
    });
  }
}

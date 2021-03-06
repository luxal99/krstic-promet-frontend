import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { DEFAULT_ROUTE, Routes } from "../constant/constant";

@Injectable({
  providedIn: "root",
})
export class GenericService<T> {
  constructor(
    public http: HttpClient,
    @Inject(DEFAULT_ROUTE) public route: Routes
  ) {}

  save(entity: T): Observable<T> {
    return this.http.post<T>(`${this.route}`, entity, {
      responseType: "json",
    });
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(`${this.route}` + id, {
      responseType: "json",
    });
  }

  getAll(q?: any): Observable<T[]> {
    return this.http.get<T[]>(`${this.route}`, {
      responseType: "json",
    });
  }

  update(entity: T): Observable<T> {
    return this.http.put<T>(`${this.route}`, entity, {
      responseType: "json",
    });
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.route}${id}`, {
      responseType: "text",
    });
  }
}

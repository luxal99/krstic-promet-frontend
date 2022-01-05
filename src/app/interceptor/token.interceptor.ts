import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { TOKEN_NAME } from "../constant/constant";

export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const secureToken = localStorage.getItem(TOKEN_NAME);
    const modifiedReq = req.clone({
      headers: req.headers.set(TOKEN_NAME, `${secureToken}`),
    });
    return next.handle(modifiedReq);
  }
}

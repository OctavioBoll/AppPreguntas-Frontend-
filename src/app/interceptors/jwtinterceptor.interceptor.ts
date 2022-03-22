import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class JWTInterceptorInterceptor implements HttpInterceptor {

  constructor(private _cookieService:CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token:string = this._cookieService.get('x-access-token')
    let req = request;
    if(token){
        req = request.clone({
          setHeaders:{
            authorization: `${token}`
          }
        });
    }
    return next.handle(req);
  }
}

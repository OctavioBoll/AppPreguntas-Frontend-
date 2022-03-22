import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient,
              private _cookieService:CookieService) { }

  login(user):Observable<any>{
    return this.http.post('http://localhost:3000/api/auth/login',user)
                    .pipe(catchError(this.errorHandler))

  }

  logout(){
    this._cookieService.delete('x-access-token')
  }

  isLogged(){
    return this._cookieService.check('x-access-token')
    
  }


  errorHandler(error:HttpErrorResponse){
    if (error instanceof HttpErrorResponse){
      if(error.error instanceof ErrorEvent){
        console.log("Error cliente")
      } else {
        console.log("Error servidor")
        console.log(error.status)
        console.log(error.statusText)
      }
    } else {
      console.log("Otro tipo de Error")
    }
    return observableThrowError(error.error.message)
  }
  


}

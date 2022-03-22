import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RegistrerServiceService {

  constructor(private http:HttpClient,
    private _snackBar:MatSnackBar) { }

  registrer(user):Observable<any>{
    return this.http.post('https://servidor-nodejs-app-preguntas.herokuapp.com/api/auth/registrar',user).pipe(catchError(this.errorHandler))
  }


  errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.error.message)
  }
}

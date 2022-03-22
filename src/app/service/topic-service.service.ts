import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs'
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicServiceService {

  private myAppUrl = 'http://localhost:3000/';
  private myApiUrl = 'api/topics/';

  constructor(private http: HttpClient) { }


  getTopics(): Observable<any>{
    return this.http.get('http://localhost:3000/api/getTopicos').pipe(catchError(this.errorHandler))
  }

  getTopicByUser(id:String): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id).pipe(catchError(this.errorHandler))
  }

  createTopic(topics:any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, topics).pipe(catchError(this.errorHandler))
  }

  updateTopic(topics:any):Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl, topics).pipe(catchError(this.errorHandler))
  }

  deleteTopic(id:any):Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id).pipe(catchError(this.errorHandler))
  }


  errorHandler(error:HttpErrorResponse){
    return observableThrowError(error.message)
  }
  

}


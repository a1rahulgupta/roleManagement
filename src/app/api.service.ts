import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:3001/api/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headerData: EventEmitter<any> = new EventEmitter();
  token: any;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
  addNewRole(data): Observable<any> {
    const url = apiUrl + 'addNewRole';
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  allRoleList(data): Observable<any> {
    const url = apiUrl + 'allRoleList';
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  getPermissionByRoleId(roleId): Observable<any> {
    const url = apiUrl + 'getPermissionByRoleId';
    return this.http.post(url,roleId, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  deleteRole(data): Observable<any> {
    const url = apiUrl + 'deleteRole';
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUserPermission(data): Observable<any> {
    const url = apiUrl + 'updatePermission';
    return this.http.post(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}

import { Injectable } from '@angular/core';
import { IProcess } from '../../models/process.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { InsuredDetails } from 'src/app/models/insured-details.model';

@Injectable({
  providedIn: 'root'
})

export class ProcessService {

  private processUrl = '';

  constructor(private http: HttpClient) { }

  getProcess(): Observable<IProcess[]> {
    this.processUrl = 'api/process/';
    return this.http.get<IProcess[]>(this.processUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
}

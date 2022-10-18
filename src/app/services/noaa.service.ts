import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoaaService {
  constructor(private http: HttpClient) { }

  getFisheries(): Observable<any> {
    return this.http.get('http://localhost:5001/gofish?apikey=abrradiology').pipe(
      catchError(err => throwError(() => new Error('Could not load fisheries.')))
    )
  }
}

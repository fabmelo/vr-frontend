// angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { catchError, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

// service
import { UtilService } from './util.service';

// outros
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    private utilService: UtilService
  ) { }

  getInitialPokemon(): Observable<Array<any>> {
    return this.httpClient
      .get<Array<any>>(`${environment.apiUrl}/pokemon`)
      .pipe(retry(2), catchError(error => this.utilService.handleError(error)));
  }

  getPokemonByName(name: string): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/pokemon/${name}`)
      .pipe(retry(2), catchError(error => this.utilService.handleError(error)));
  }

  getDynamicPokemon(url: string): Observable<any> {
    return this.httpClient
      .get<any>(url)
      .pipe(retry(2), catchError(error => this.utilService.handleError(error)));
  }

}

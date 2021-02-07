// angular
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

// rxjs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


/**
 * Classe de interceptor de error
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  parseErrors(response) {
    let errors = [];

    for (let key in response.errors) {
      for (var i = 0; i < response.errors[key].length; i++) {
        errors.push(response.errors[key][i]);
      }
    }

    return errors;
  }

  /**
   * Intercepta a requisições para API em caso de erro
   * @param request
   * @param next
   * @returns Devolve o handle de erros do interceptor
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let error = '';

    return next.handle(request).pipe(catchError(err => {

      if (err.status === 401) {
        error = "Não autorizado!";
      } else if (err.status === 404) {
        error = "O Pokemon não foi encontrado!";
      } else if (err.status === 400) {
        let e = this.parseErrors(err.error);
        error = e[0];
      } else if (err.status === 500) {
        error = "Ocorreu um problema interno no servidor."
      } else {
        error = err.error.message || err.statusText;
      }

      return throwError(error);

    }));

  }
}

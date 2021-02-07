// angular
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// rxjs
import { throwError } from "rxjs";

/**
 * Classe de serviço de Util
 */
@Injectable({
  providedIn: "root",
})
export class UtilService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  /**
   * Manipulação de erros
   * @param error
   * @returns Devolve o erro
   */
  handleError(error: HttpErrorResponse) {

    let errorMessage = "";

    if (error.status === undefined || error.message === undefined)
      return throwError(error);

    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = `Erro no SPA: ${error.error.message}`;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Erro no Servidor: ${error.status}, ` + `mensagem: ${error.message}`;
    }

    return throwError(errorMessage);
  }

  /**
   * Toast message padrão com padrão de 4000 milissegundos
   * @param message
   */
  async toastMessage(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

}

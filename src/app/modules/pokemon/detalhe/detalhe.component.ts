// angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// service
import { UtilService } from './../../../core/services/util.service';
import { ApiService } from './../../../core/services/api.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss']
})
export class DetalheComponent implements OnInit {

  pokemonDetail: any;
  pokemonName: string;
  errorMsg: string;

  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngAfterContentInit() {
    // recebe o id da rota
    this.pokemonName = this.activatedRoute.snapshot.paramMap.get('name');
    // busca os detalhes do abastecimento pelo id
    this.onDetail();
  }

  ngOnInit() { }

  onDetail() {
    this.apiService.getPokemonByName(this.pokemonName).pipe(
      catchError(error => {
        this.errorMsg = error;
        return of([]);
      })
    )
      .subscribe(
        (res: any) => {
          this.pokemonDetail = res;
        },
        (error: any) => {
          this.utilService.toastMessage('Erro ao obter detalhe do pokemon!');
        }
      );
  }

}

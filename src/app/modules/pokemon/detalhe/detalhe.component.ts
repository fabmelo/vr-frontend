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
    this.apiService.getPokemonByName(this.pokemonName)
      .pipe(
        catchError(error => {
          this.errorMsg = error;
          return of([]);
        })
      ).subscribe(
        (res: any) => {
          this.pokemonDetail = res;

          let array = [];

          // busca mais detalhes das habilidades
          res.abilities.forEach((element, index) => {

            this.apiService.getDynamicPokemon(element.ability.url).subscribe(
              (detail: any) => {

                // faz o filtro somente para idioma inglês
                const effects = detail.effect_entries.filter(effect => effect.language.name === "en");

                // agrega o dado filtrado ao array principal
                array = effects[0]
                this.pokemonDetail['abilities'][index]['ability']['effects'] = array;
              },
              (error: any) => {
                this.utilService.toastMessage('Erro ao obter mais detalhe do pokemon!');
              }
            );
          });

        },
        (error: any) => {
          this.utilService.toastMessage('Erro ao obter detalhe do pokemon!');
        }
      );
  }

}

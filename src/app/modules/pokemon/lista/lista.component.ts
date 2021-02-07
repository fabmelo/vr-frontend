// angular
import { Component, OnInit } from '@angular/core';

// services
import { UtilService } from './../../../core/services/util.service';
import { ApiService } from './../../../core/services/api.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  pokemonList: Array<any>;
  pokemonNext: string;
  infiniteScrollDistance = 5;
  infiniteScrollThrottle = 300;

  constructor(
    private apiService: ApiService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.onGetListPokemon();
  }

  onGetListPokemon(){
    this.apiService.getInitialPokemon().subscribe(
      (res: any) => {
        this.pokemonList = res.results;
        this.pokemonNext = res.next;
      },
      (error: any) => {
        this.utilService.toastMessage('Erro ao obter a lista de pokemons!');
      }
    );
  }

  onScroll(){
    this.apiService.getDynamicPokemon(this.pokemonNext).subscribe(
      (res: any) => {
        this.pokemonList = this.pokemonList.concat(res.results);
        this.pokemonNext = res.next;
      },
      (error: any) => {
        this.utilService.toastMessage('Erro ao obter a lista de pokemons!');
      }
    );
  }

}

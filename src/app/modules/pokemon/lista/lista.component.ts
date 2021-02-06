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
  pokemonPrevious: string;
  infiniteScrollDistance = 1;
  infiniteScrollUpDistance = 2;
  infiniteScrollThrottle = 300;

  constructor(
    private apiService: ApiService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.onGetListPokemon();
  }

  // initial
  onGetListPokemon(){
    this.apiService.getInitialPokemon().subscribe(
      (res: any) => {
        this.pokemonList = res.results;
        this.pokemonNext = res.next;
        this.pokemonPrevious = res.previous;
      },
      (error: any) => {
        this.utilService.toastMessage('Erro ao obter a lista de pokemons!');
      }
    );
  }

  // next
  onScrollDown(){
    this.apiService.getDynamicPokemon(this.pokemonNext).subscribe(
      (res: any) => {
        this.pokemonList = res.results;
        this.pokemonNext = res.next;
        this.pokemonPrevious = res.previous;
      },
      (error: any) => {
        this.utilService.toastMessage('Erro ao obter a lista de pokemons!');
      }
    );
  }

  // previous
  onScrollUp(){
    this.apiService.getDynamicPokemon(this.pokemonPrevious).subscribe(
      (res: any) => {
        this.pokemonList = res.results;
        this.pokemonNext = res.next;
        this.pokemonPrevious = res.previous;
      },
      (error: any) => {
        this.utilService.toastMessage('Erro ao obter a lista de pokemons!');
      }
    );
  }

}

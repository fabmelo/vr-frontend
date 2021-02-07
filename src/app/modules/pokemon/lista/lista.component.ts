// angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// services
import { UtilService } from './../../../core/services/util.service';
import { ApiService } from './../../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  form: FormGroup;
  pokemonList: Array<any>;
  pokemonNext: string;
  infiniteScrollDistance = 5;
  infiniteScrollThrottle = 300;

  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.onGetListPokemon();
  }

  createForm() {
    this.form = this.formBuilder.group({
      Search: ['']
    });
  }

  onSearch(){
    const name: string = this.form.get("Search").value;
    this.router.navigate(['/detalhe', name.toLowerCase()]);
  }

  onDetail(name: string){
    this.router.navigate(['/detalhe', name]);
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

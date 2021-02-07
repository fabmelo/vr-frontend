// angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// service
import { UtilService } from './../../../core/services/util.service';
import { ApiService } from './../../../core/services/api.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss']
})
export class DetalheComponent implements OnInit {

  pokemonDetail: any;

  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngAfterContentInit() {
    // recebe o id da rota
    let name = this.activatedRoute.snapshot.paramMap.get('name');
    // busca os detalhes do abastecimento pelo id
    this.onDetail(name);
  }

  ngOnInit() {}

  onDetail(name: string){
    this.apiService.getPokemonByName(name).subscribe(
      (res: any) => {
        this.pokemonDetail = res;
        console.log(res);
      },
      (error: any) => {
        this.utilService.toastMessage('Erro ao obter detalhe do pokemon!');
      }
    );
  }

}

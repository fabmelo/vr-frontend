// angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { ListaComponent } from './modules/pokemon/lista/lista.component';
import { DetalheComponent } from './modules/pokemon/detalhe/detalhe.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full'
  },
  {
    path: 'lista',
    component: ListaComponent
  },
  {
    path: 'detalhe/:name',
    component: DetalheComponent
  },
  {
    path: 'detalhe',
    component: DetalheComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

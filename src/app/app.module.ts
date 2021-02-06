// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// modules
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { ListaComponent } from './modules/pokemon/lista/lista.component';
import { DetalheComponent } from './modules/pokemon/detalhe/detalhe.component';

// material
import { MatSnackBarModule } from '@angular/material/snack-bar';

// others
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    DetalheComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

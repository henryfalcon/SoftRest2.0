import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespacharComandaRoutingModule } from './despachar-comanda-routing.module';
import { DespacharComandaComponent } from './components/despachar-comanda.component';


@NgModule({
  declarations: [
    DespacharComandaComponent
  ],
  imports: [
    CommonModule,
    DespacharComandaRoutingModule
  ]
})
export class DespacharComandaModule { }

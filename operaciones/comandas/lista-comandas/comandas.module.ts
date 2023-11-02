import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComandasRoutingModule } from './comandas-routing.module';
import { ListaComandasComponent } from './components/lista-comandas.component';

@NgModule({
  declarations: [
    ListaComandasComponent,
  ],
  imports: [
    CommonModule,
    ComandasRoutingModule
  ]
})
export class ComandasModule { }

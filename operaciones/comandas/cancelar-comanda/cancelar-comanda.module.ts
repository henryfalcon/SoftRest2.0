import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancelarComandaRoutingModule } from './cancelar-comanda-routing.module';
import { CancelarComandaComponent } from './components/cancelar-comanda.component';

@NgModule({
  declarations: [
    CancelarComandaComponent
  ],
  imports: [
    CommonModule,
    CancelarComandaRoutingModule
  ]
})
export class CancelarComandaModule { }

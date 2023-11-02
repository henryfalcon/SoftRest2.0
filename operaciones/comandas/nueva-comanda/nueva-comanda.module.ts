import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevaComandaRoutingModule } from './nueva-comanda-routing.module';
import { NuevaComandaComponent } from './components/nueva-comanda.component';

@NgModule({
  declarations: [NuevaComandaComponent],
  imports: [
    CommonModule,
    NuevaComandaRoutingModule
  ]
})
export class NuevaComandaModule { }

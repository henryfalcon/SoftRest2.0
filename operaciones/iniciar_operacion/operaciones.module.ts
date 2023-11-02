import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperacionesRoutingModule } from './operaciones-routing.module';
import { IniciarComponent } from './components/iniciar.component';

@NgModule({
  declarations: [
    IniciarComponent
  ],
  imports: [
    CommonModule,
    OperacionesRoutingModule
  ]
})
export class OperacionesModule { }

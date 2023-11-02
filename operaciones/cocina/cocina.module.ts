import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CocinaRoutingModule } from './cocina-routing.module';
import { ListaCocinaComponent } from './lista-cocina/lista-cocina.component';


@NgModule({
  declarations: [
    ListaCocinaComponent
  ],
  imports: [
    CommonModule,
    CocinaRoutingModule
  ]
})
export class CocinaModule { }

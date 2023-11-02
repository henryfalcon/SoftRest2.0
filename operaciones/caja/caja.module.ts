import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CajaRoutingModule } from './caja-routing.module';
import { CajaListComponent } from './caja-list/caja-list.component';


@NgModule({
  declarations: [
    CajaListComponent
  ],
  imports: [
    CommonModule,
    CajaRoutingModule
  ]
})
export class CajaModule { }

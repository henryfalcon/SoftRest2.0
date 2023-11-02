import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list'; 
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { newDashboardComponent } from './component/mainDashboard/dashboard.component'
import { DashboardRoutingModule } from '../newdashboard/newdashboard-routing.module';
import { SliderModule } from 'src/app/shared/componentes/slider/slider.module';
import { Tarjeta1Component } from './component/tarjeta1/tarjeta1.component';

@NgModule({
  declarations: [
    newDashboardComponent,
    Tarjeta1Component,    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatListModule,   
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule,
    SliderModule
  ]
})
export class NewdashboardModule { }

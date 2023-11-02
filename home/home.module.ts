import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//routing 
import { HomeRoutingModule } from './home-routing.module';
//component
import { HomeComponent } from './home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MenuSidenavComponent } from './components/menu-sidenav/menu-sidenav.component'; 
//material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HomeComponent,
    ToolbarComponent,
    MenuSidenavComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatSidenavModule,
    MatToolbarModule, 
    MatListModule, 
    MatIconModule,
    MatButtonModule,
    MatTooltipModule

  ]
})
export class HomeModule { }

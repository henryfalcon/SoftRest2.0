import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//route
import { ConfiguracionesRoutingModule } from './configuraciones-routing.module';
//components
import { ListaConfiguracionesComponent } from './lista-configuraciones/lista-configuraciones.component';
//confirm dialog
import { ConfirmDialogModule } from '../../shared/componentes/confirm-dialog/confirm-dialog.module';
//material
import { MatButtonModule } from '@angular/material/button';
import { FormularioComponent } from './formulario/formulario.component';

@NgModule({
  declarations: [    
    ListaConfiguracionesComponent, FormularioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,    
    ConfiguracionesRoutingModule,
    ConfirmDialogModule,      
    MatButtonModule,
  ]
})  
export class ConfiguracionesModule { }

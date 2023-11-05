import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//route
import { UsuariosRoutingModule } from './usuarios-routing.module';
//components
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
//confirm dialog
import { ConfirmDialogModule } from '../../shared/componentes/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [
    ListaUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ConfirmDialogModule,  
  ]
})
export class UsuariosModule { }

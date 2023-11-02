import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//route
import { UsuariosRoutingModule } from './usuarios-routing.module';
//components
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { TableListComponent } from './table-view/table-list.component';
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
    TableListComponent
  ]
})
export class UsuariosModule { }

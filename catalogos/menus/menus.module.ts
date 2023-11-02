import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//route
import { MenusRoutingModule } from './menus-routing.module';
//components
import { ListaMenusComponent } from './lista-menus/lista-menus.component';
import { TableListComponent } from './table-view/table-list.component';
//confirm dialog
import { ConfirmDialogModule } from '../../shared/componentes/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [
    ListaMenusComponent
  ],
  imports: [
    CommonModule,
    MenusRoutingModule,
    ConfirmDialogModule,
    TableListComponent
  ]
})
export class MenusModule { }

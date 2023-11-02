import { Component, OnInit } from '@angular/core';
//rxjs
import { Subject, takeUntil, take } from 'rxjs';
//model
import { MenuI } from 'src/app/shared/model/catalogos/menu';
//services
import { MenuDbService } from '../../../shared/DbServices/catalogo/menu-db.service';
//utils
import { IsLoadingService } from '@service-work/is-loading';
import { SnackBarService } from '../../../shared/utilidades/snackBarSvc/snack-bar.service';
//confirm-dialog
import { ConfirmDialogComponent } from '../../../shared/componentes/confirm-dialog/componente/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-menus',
  templateUrl: './lista-menus.component.html',
  styleUrls: ['./lista-menus.component.css']
})
export class ListaMenusComponent implements OnInit {
  menus: MenuI[] = [];
  unSub_menu = new Subject<void>();

  constructor( 
    private menuDb: MenuDbService,
    private loadSvc: IsLoadingService,
    private snackBarMsg: SnackBarService,
    private dialog: MatDialog ) {         
  }

  ngOnInit(): void {  
    this.getMenus();
  }


  ngOnDestroy(): void {
    this.unSub_menu.next();
    this.unSub_menu.complete();
  }

  getMenus() {
    const menus_getting = this.menuDb.getMenus().pipe(takeUntil(this.unSub_menu));
    this.loadSvc.add(menus_getting, {key:'loading'});
    menus_getting.subscribe({
      next: (menus) => this.menus = menus, 
      error: (error) => this.mostrarErrorMensaje(`Se produjo el siguiente error: ${error}`)});
  }

  mostrarErrorMensaje(mensaje: string) {
    const dialogconfirm = this.dialog.open(ConfirmDialogComponent, {
      data: { title:'Se produjo lo siguiente:', 
              message:mensaje, 
              confirmText: 'Ok',
              cancelText: 'Cancelar',              
              isErrorMsg: true }
    });
    dialogconfirm.afterClosed().pipe(take(1)).subscribe();
  }
}

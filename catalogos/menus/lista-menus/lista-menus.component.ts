import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//rxjs
import { Subject, takeUntil, take } from 'rxjs';
//model
import { MenuI } from 'src/app/shared/model/catalogos/menu';
//services
import { MenuDbService } from '../../../shared/DbServices/catalogo/menu-db.service';
//utils
import { IsLoadingService } from '@service-work/is-loading';
//confirm-dialog
import { ConfirmDialogComponent } from '../../../shared/componentes/confirm-dialog/componente/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
//Table
import { TableColumn } from '../../../shared/componentes/table/table-column';
//comunication interfaces
import { LayoutComService } from '../../../home/services/layout-com.service';

@Component({
  selector: 'app-lista-menus',
  templateUrl: './lista-menus.component.html',
  styleUrls: ['./lista-menus.component.css']
})
export class ListaMenusComponent implements OnInit {
  menus: MenuI[] = [];
  unSub_menu = new Subject<void>();
  tableColumns: TableColumn[] = []

  constructor( 
    private router: Router,
    private menuDb: MenuDbService,
    private loadSvc: IsLoadingService,    
    private menuEditSelectionSvc: LayoutComService,
    private dialog: MatDialog ) {         
  }

  ngOnInit(): void {  
    this.getMenus();
    this.setTableColumns()
  }

  setTableColumns() {
    this.tableColumns = [
      { label: 'Menu', def: 'menu', dataKey: 'menu' },
      { label: 'Fecha Inicio', def: 'fecha_inicio_str', dataKey: 'fecha_inicio_str' },
      { label: 'status', def: 'status', dataKey: 'status' },
    ]
  }

  ngOnDestroy(): void {
    this.unSub_menu.next();
    this.unSub_menu.complete();
  }

  getMenus() {
    const menus_getting = this.menuDb.getMenus().pipe(takeUntil(this.unSub_menu));
    this.loadSvc.add(menus_getting, {key:'loading'});
    menus_getting.subscribe({
      next: (menus) => {this.menus = menus}, 
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

  submit() {
    this.router.navigate(['/menus/formulario/Alta']);
  }

  registroSeleccionado(menu: MenuI) {
     this.menuEditSelectionSvc.informarMenuEditar(menu)
    setTimeout(() => {    
      this.router.navigate(['menus/formulario/Edicion'])
    }, 800)
  }

  isLoading(key_loading: string): boolean {
    return this.loadSvc.isLoading({ key: key_loading })
  }

}

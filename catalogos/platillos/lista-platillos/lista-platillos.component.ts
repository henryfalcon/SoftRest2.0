import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//rxjs
import { Subject, takeUntil, take } from 'rxjs';
//model
import { PlatilloI } from 'src/app/shared/model/catalogos/platillo';
//services
import { PlatilloDbService } from '../../../shared/DbServices/catalogo/platillo-db.service';
//utils
import { IsLoadingService } from '@service-work/is-loading';
//confirm-dialog
import { ConfirmDialogComponent } from '../../../shared/componentes/confirm-dialog/componente/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
//comunication interfaces
import { LayoutComService } from '../../../home/services/layout-com.service';
//Table
import { TableColumn } from '../../../shared/componentes/table/table-column';

@Component({
  selector: 'app-lista-platillos',
  templateUrl: './lista-platillos.component.html',
  styleUrls: ['./lista-platillos.component.css']
})
export class ListaPlatillosComponent implements OnInit {
  platillos: PlatilloI[] = [];
  unSub_platillos = new Subject<void>();
  tableColumns: TableColumn[] = []

  constructor( 
    private router: Router,
    private platilloDb: PlatilloDbService, 
    private loadSvc: IsLoadingService,  
    private platilloEditSelectionSvc: LayoutComService,
    private dialog: MatDialog ) {               
  }

  ngOnInit(): void {  
    this.getplatillos()
    this.setTableColumns()
  }

  ngOnDestroy(): void {
    this.unSub_platillos.next();
    this.unSub_platillos.complete();
  }

  setTableColumns() {
    this.tableColumns= [
      { label: 'Desc. Corta', def: 'desc_corta', dataKey:'desc_corta'},
      { label: 'Desc Larga', def: 'desc_larga', dataKey: 'desc_larga'},
      { label: 'Categoria', def: 'categoria', dataKey: 'categoria'},
      { label: 'Acompañamiento', def: 'acompanamiento', dataKey: 'acompanamiento'}
    ]
  }

  getplatillos() {
    const platillos_getting = this.platilloDb.getPlatillos().pipe(takeUntil(this.unSub_platillos));
    this.loadSvc.add(platillos_getting, {key:'loading'});
    platillos_getting.subscribe({
      next: (plats) => this.platillos = plats,
      error: (error) => this.mostrarErrorMensaje(`Se produjo el siguiente error: ${error}`)});
  }

  registroSeleccionado(platillo: PlatilloI){
    this.platilloEditSelectionSvc.informarPlatilloEditar(platillo)        
    setTimeout(() => {
      this.router.navigate(['/platillos/edit'])           
    }, 800)
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
  
  submit(){    
    this.router.navigate(['/empleados/alta']);
  }

  isLoading(key_loading: string): boolean {
    return this.loadSvc.isLoading({key: key_loading})
  }
}

import { Component, OnInit } from '@angular/core';
//rxjs
import { Subject, takeUntil, take } from 'rxjs';
//model
import { ConfiguracionI } from 'src/app/shared/model/catalogos/configuracion';
//services
import { ConfiguracionDbService } from '../../../shared/DbServices/catalogo/configuracion-db.service';
//utils
import { IsLoadingService } from '@service-work/is-loading';
import { SnackBarService } from '../../../shared/utilidades/snackBarSvc/snack-bar.service';
//confirm-dialog
import { ConfirmDialogComponent } from '../../../shared/componentes/confirm-dialog/componente/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-configuraciones',
  templateUrl: './lista-configuraciones.component.html',
  styleUrls: ['./lista-configuraciones.component.css']
})
export class ListaConfiguracionesComponent implements OnInit {

  configuraciones: ConfiguracionI[] = [];
  unSub_Configuracion = new Subject<void>();

  constructor( 
    private configuracionDb: ConfiguracionDbService, 
    private loadSvc: IsLoadingService,
    private snackBarMsg: SnackBarService,
    private dialog: MatDialog ) {         
  }

  ngOnInit(): void {  
    this.getConfiguraciones();
  }

  ngOnDestroy(): void {
    this.unSub_Configuracion.next();
    this.unSub_Configuracion.complete();
  }

  getConfiguraciones() {
    const Configuracions_getting = this.configuracionDb.getConfiguraciones().pipe(takeUntil(this.unSub_Configuracion));
    this.loadSvc.add(Configuracions_getting, {key:'loading'});
    Configuracions_getting.subscribe({
      next: (confs) => this.configuraciones = confs, 
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

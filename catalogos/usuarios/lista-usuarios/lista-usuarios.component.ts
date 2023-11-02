import { Component, OnInit } from '@angular/core';
//rxjs
import { Subject, takeUntil, take } from 'rxjs';
//model
import { UsuarioI } from 'src/app/shared/model/catalogos/usuario';
//services
import { UsuariosDbService } from '../../../shared/DbServices/catalogo/usuarios-db.service';
//utils
import { IsLoadingService } from '@service-work/is-loading';
import { SnackBarService } from '../../../shared/utilidades/snackBarSvc/snack-bar.service';
//confirm-dialog
import { ConfirmDialogComponent } from '../../../shared/componentes/confirm-dialog/componente/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: UsuarioI[] = [];
  unSub_usuarios = new Subject<void>();

  constructor( 
    private usuarioDb: UsuariosDbService, 
    private loadSvc: IsLoadingService,
    private snackBarMsg: SnackBarService,
    private dialog: MatDialog ) {         
  }

  ngOnInit(): void {  
    this.getusuarios();
  }

  ngOnDestroy(): void {
    this.unSub_usuarios.next();
    this.unSub_usuarios.complete();
  }

  getusuarios() {
    const usuarios_getting = this.usuarioDb.getUsuarios().pipe(takeUntil(this.unSub_usuarios));
    this.loadSvc.add(usuarios_getting, {key:'loading'});
    usuarios_getting.subscribe({
      next: (emps) => this.usuarios = emps, 
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

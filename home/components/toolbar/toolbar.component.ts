import { Component, OnInit } from '@angular/core';
import { LayoutComService } from '../../services/layout-com.service';
import { Subject } from 'rxjs';
import { AutenticacionService } from '../../../autenticacion/service/autenticacion.service';
import { SnackBarService } from 'src/app/shared/utilidades/snackBarSvc/snack-bar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'main-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  mostrarButonesAltaListar: boolean = false
  unSubBotonesAltaListar = new Subject();
  userLogged: boolean = false
  unSubUserLogged = new Subject();

  constructor( 
    private Operations_svc: LayoutComService,
    private authSvc: AutenticacionService,
    private snackSvc: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    const unSubBotonesAltaListar = this.Operations_svc.botonesAltaLista$
    unSubBotonesAltaListar.subscribe({next:(mostrar)=>{
      setTimeout(() => {
        this.mostrarButonesAltaListar = mostrar  
      }, 10);        
    }})
    const unSubUserLogged = this.Operations_svc.useLogged$
    unSubUserLogged.subscribe
      ({next:(logged)=>{
        this.userLogged = logged          
        if (logged) {
          //          
        }
        else {          
          this.router.navigate(['/Login'])
        }
    }})
  }

  ngOnDestroy(): void {
    this.unSubBotonesAltaListar.next(false)
    this.unSubBotonesAltaListar.complete()
    this.unSubUserLogged.next(false)
    this.unSubUserLogged.complete()
  }

  MostrarSideMenu() {
    this.Operations_svc.mostrarSideMenu(); 
  }

  nuevoRegistro() {
      this.Operations_svc.informarNuevoRegistroClicked(true);  
  }

  listarRegistros() {
    this.Operations_svc.listarRegistrosClicked(true);
  }

  LogIn() {
    this.router.navigate(['/Login'])
  }

  LogOut() {    
    this.authSvc.logout().then( () => {    
      this.Operations_svc.usuarioLogin = false
    }, error => {
      this.snackSvc.succes(error)
    })
  }

  registrarse() {
    this.router.navigate(['/registrarse'])
  }
}

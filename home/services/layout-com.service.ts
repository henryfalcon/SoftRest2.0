import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
//models
import { EmpleadoI } from '../../shared/model/catalogos/empleado';
import { PlatilloI } from '../../shared/model/catalogos/platillo';
import { MenuI } from '../../shared/model/catalogos/menu';

@Injectable({
  providedIn: 'root'
})
export class LayoutComService {

  private mostrar_side_menu: boolean = false;
  private mostrar_botones_alta_listar: boolean = false;
  private nuevo_registro_clicked: boolean = false;
  private listar_registros_clicked: boolean = false;
  private userLogged: boolean = false
  
  private sideNavMenuSubject$ = new BehaviorSubject<boolean>(this.mostrar_side_menu)
  private mostrarBotonesAltaListarSubject$ = new BehaviorSubject<boolean>(this.mostrar_botones_alta_listar)
  private buttonNuevoRegistroSubject$ = new BehaviorSubject<boolean>(this.nuevo_registro_clicked)
  private buttonListarRegistrosSubject$ = new BehaviorSubject<boolean>(this.listar_registros_clicked)

  private editarEmpleadoSubject$ = new ReplaySubject<EmpleadoI>(1)
  private editarPlatilloSubject$ = new ReplaySubject<PlatilloI>(1)
  private editarMenuSubject$ = new ReplaySubject<MenuI>(1)

  private userLoggedSubject$ = new BehaviorSubject<boolean>(this.userLogged)

  sideNavMenuChanged$ = this.sideNavMenuSubject$.asObservable();
  botonesAltaLista$ = this.mostrarBotonesAltaListarSubject$.asObservable();
  buttonNuevoRegistroClicked$ = this.buttonNuevoRegistroSubject$.asObservable();
  buttonListarRegistrosClicked$ = this.buttonListarRegistrosSubject$.asObservable();
  
  editarEmpleadoSelected$ = this.editarEmpleadoSubject$.asObservable();
  editarPlatilloSelected$ = this.editarPlatilloSubject$.asObservable();
  editarMenuSelected$ = this.editarMenuSubject$.asObservable();
  
  useLogged$ = this.userLoggedSubject$.asObservable();

  constructor() { }

  mostrarBotonesAltaListar(mostrar:boolean) {
    this.mostrar_botones_alta_listar = mostrar
    this.mostrarBotonesAltaListarSubject$.next(this.mostrar_botones_alta_listar);
  }

  public set usuarioLogin(logged: boolean) {
    this.userLogged = logged;
    this.mostrarBotonesAltaListarSubject$.next(false)
    this.userLoggedSubject$.next(this.userLogged);  
  }
  
  mostrarSideMenu() {
    this.mostrar_side_menu = !this.mostrar_side_menu;
    this.sideNavMenuSubject$.next(this.mostrar_side_menu);
  }

  informarNuevoRegistroClicked(clicked: boolean) {
    this.buttonNuevoRegistroSubject$.next(clicked)
  } 

  informarEmpleadoEditar(empleado: EmpleadoI){
    this.editarEmpleadoSubject$.next(empleado)
  }

  informarPlatilloEditar(platillo: PlatilloI){  
    this.editarPlatilloSubject$.next(platillo)
  }

  informarMenuEditar(menu: MenuI){  
    this.editarMenuSubject$.next(menu)
  }  

  listarRegistrosClicked(clicked: boolean) {
    this.buttonListarRegistrosSubject$.next(clicked)
  }
}

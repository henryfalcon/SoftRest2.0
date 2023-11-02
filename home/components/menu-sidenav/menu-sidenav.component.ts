import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListOption } from '@angular/material/list';
//router
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
//services
import { LayoutComService } from '../../services/layout-com.service';
//material
import { MatDrawer } from '@angular/material/sidenav';

export type menuType =
  'Catalogos' | 'Operaciones' | 'Comandas' | 'Cocina' | 'Caja' | 'Reportes'

export type subMenuType =
  'Empleados' | 'Platillos' | 'Configuraciones' | 'Usuarios' |
  'Menus' | 'Iniciar' | 'Lista Comandas' | 'Nueva Comanda' | 'Ventas' |
  'Cancelar Comanda' | 'Corte' | 'Ordenes' | 'Cerrar' | 'Despachar Comanda' | 'Retornar'

export interface subMenuAndNavigateInfo {
  submenu: subMenuType, navigateinfo?: string
}

export interface menuAndSubMenu {
  menu: menuType,
  submenu: subMenuAndNavigateInfo[]
}

@Component({
  selector: 'menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.css']
})
export class MenuSidenavComponent implements OnInit {
  Menu_Items: menuType[] = ['Catalogos'];
  Submenu_Items: subMenuType[] = ['Empleados'];
  MenuSubMenu: menuAndSubMenu[] = []

  @ViewChild('option1') option1!: MatListOption;
  @ViewChild('option2') option2!:  MatListOption;
  @ViewChild('drawer1') drawer1!: MatDrawer;
  @ViewChild('drawer2') drawer2!: MatDrawer;

  sideNavSub!: Subscription;
  userLoggedSub!: Subscription
  optionOneSub!: Subscription
  optionTwoSub!: Subscription

  constructor( private router: Router, private menu_sidenav_svc: LayoutComService) { }

  ngOnInit(): void {
    this.IniciarMenuySubmenu();
  }

  ngOnDestroy(): void {
    this.sideNavSub.unsubscribe;
    this.userLoggedSub.unsubscribe()
    this.optionOneSub.unsubscribe()
    this.optionTwoSub.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.subscribeToMenu1Selection()
    this.subscribeToMenu2Selection()
    this.susbscribeToMenuHamburgesaChange()
    this.subscribeToUSerLog_In_Out()
  }

  IniciarMenuySubmenu(){ 
    this.MenuSubMenu.push(
      { menu:'Catalogos', submenu:[
        {submenu:'Empleados', navigateinfo:'/empleados'},
        {submenu:'Platillos', navigateinfo:'/platillos'},
        {submenu:'Usuarios', navigateinfo:'/usuarios'},
        {submenu:'Menus', navigateinfo:'/menus'},
        {submenu:'Configuraciones', navigateinfo:'/configuraciones'},
      ]})
    this.MenuSubMenu.push(
      { menu:'Operaciones', submenu:[
        {submenu:'Iniciar', navigateinfo:'/operaciones'},
        {submenu:'Cerrar', navigateinfo:'/operaciones'},
    ]})      
    this.MenuSubMenu.push(
      { menu:'Comandas', submenu:[
        {submenu:'Lista Comandas', navigateinfo:'/comandas'},
        {submenu:'Nueva Comanda', navigateinfo:'/nueva_comanda'},
        {submenu:'Despachar Comanda', navigateinfo:'/despachar_comanda'},
        {submenu:'Cancelar Comanda', navigateinfo:'/cancelar_comanda'},     
    ]})
    this.MenuSubMenu.push(
      { menu:'Cocina', submenu:[
        {submenu:'Ordenes', navigateinfo:'/cocina'},
    ]})            
    this.MenuSubMenu.push(
      { menu:'Caja', submenu:[
        {submenu:'Corte', navigateinfo:'/caja'},
    ]})                  
    this.MenuSubMenu.push(
      { menu:'Reportes', submenu:[
        {submenu:'Ventas', navigateinfo:'/reportes'},
    ]})                        
    this.Menu_Items = []
    this.MenuSubMenu.forEach(menu=>{
      this.Menu_Items.push(menu.menu)
    })
  }

  asignaSubMenu(menu_p: menuType) {
    this.Submenu_Items=[]
    this.MenuSubMenu.forEach(menu => {
      if (menu.menu == menu_p){
        menu.submenu.forEach(submenu => {
          this.Submenu_Items.push(submenu.submenu)
        })
      }
    })
  }

  subscribeToMenu1Selection() {
    let menuSelected: menuType;
    this.optionOneSub = this.option1.selectionList.selectionChange.subscribe(
      value => {
        menuSelected = value.source.selectedOptions.selected[0].value;
        this.asignaSubMenu(menuSelected);
      }
    );
  }

  getSubMenuNavigationString(submenu_p: string): string {
    let navString: string | undefined = ''
    this.MenuSubMenu.forEach(menu => {
      menu.submenu.forEach(submenu => {
        if (submenu.submenu == submenu_p) {
          navString = submenu.navigateinfo
        }
      })
    })
    return navString
  }

  subscribeToMenu2Selection() {
    this.optionTwoSub = this.option2.selectionList.selectionChange.subscribe(
      value => {
        let subMenu: subMenuType = value.source.selectedOptions.selected[0].value;
        let navigateTo = this.getSubMenuNavigationString(subMenu)
        this.router.navigate([navigateTo])
      }
    )
  }

  susbscribeToMenuHamburgesaChange() {
    setTimeout(() => {
      this.sideNavSub = this.menu_sidenav_svc.sideNavMenuChanged$
        .subscribe((res) => {
          if (res == true) { this.drawer1.toggle() }
        })
    }, 0)
  }

  clearSelectionListOptions() {
    this.option1.selectionList.options.reset
    this.option1.selectionList.selectedOptions.clear()
    this.option2.selectionList.options.reset
    this.option2.selectionList.selectedOptions.clear()
  }

  subscribeToUSerLog_In_Out() {
    this.userLoggedSub = this.menu_sidenav_svc.useLogged$.subscribe({
      next: (logged) => {
        if (logged == false) {
          this.clearSelectionListOptions();
          if (this.drawer1.opened) { this.drawer1.close() }
          if (this.drawer2.opened) { this.drawer2.close() }
        }
        else {
          this.drawer1.open()
        }
      }
    })
  }

}
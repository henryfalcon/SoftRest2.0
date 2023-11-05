import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ListaMenusComponent } from './lista-menus/lista-menus.component';
import { FormMenuComponent } from './form-menu/form-menu.component';


const routes: Routes = [
  { path: '', component: IndexComponent, 
    children: [
      { path: '', redirectTo: 'lista', pathMatch:'full' },   
      { path: 'lista', component: ListaMenusComponent },   
      { path: 'formulario/:modo', component: FormMenuComponent } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }

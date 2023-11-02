import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMenusComponent } from './lista-menus/lista-menus.component';

const routes: Routes = [{
  path:'', component:ListaMenusComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenusRoutingModule { }

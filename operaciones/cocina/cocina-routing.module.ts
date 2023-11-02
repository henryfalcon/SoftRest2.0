import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCocinaComponent } from './lista-cocina/lista-cocina.component';

const routes: Routes = [{
  path:'', component:ListaCocinaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocinaRoutingModule { }

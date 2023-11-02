import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComandasComponent } from './components/lista-comandas.component';

const routes: Routes = [{
  path: '', component:ListaComandasComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComandasRoutingModule { }

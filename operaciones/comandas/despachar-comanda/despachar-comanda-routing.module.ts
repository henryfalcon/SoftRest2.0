import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DespacharComandaComponent } from './components/despachar-comanda.component';

const routes: Routes = [
  {path: '', component: DespacharComandaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespacharComandaRoutingModule { }

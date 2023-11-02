import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CancelarComandaComponent } from './components/cancelar-comanda.component';

const routes: Routes = [
  { path: '', component: CancelarComandaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancelarComandaRoutingModule { }

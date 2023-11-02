import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaComandaComponent } from './components/nueva-comanda.component';

const routes: Routes = [
  {path: '', component: NuevaComandaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevaComandaRoutingModule { }

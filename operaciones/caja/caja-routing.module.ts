import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CajaListComponent } from './caja-list/caja-list.component';

const routes: Routes = [{
  path: '', component: CajaListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CajaRoutingModule { }

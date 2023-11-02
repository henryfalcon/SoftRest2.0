import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPlatillosComponent } from './lista-platillos/lista-platillos.component';
import { IndexComponent } from './index/index.component';
import { AltaPlatilloComponent } from './alta-platillo/alta-platillo.component';
import { EditPlatilloComponent } from './edit-platillo/edit-platillo.component';

const routes: Routes = [{
    path:'', component: IndexComponent,
    children: [
      {path:'', redirectTo:'lista', pathMatch:'full'},
      { path: 'alta', component: AltaPlatilloComponent },   
      { path: 'edit', component: EditPlatilloComponent },   
      { path: 'lista', component: ListaPlatillosComponent },         
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatillosRoutingModule { }

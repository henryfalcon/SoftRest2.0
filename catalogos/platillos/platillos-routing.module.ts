import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPlatillosComponent } from './lista-platillos/lista-platillos.component';
import { IndexComponent } from './index/index.component';
import { FormPlatilloComponent } from './form-platillo/form-platillo.component';

const routes: Routes = [{
    path:'', component: IndexComponent,
    children: [
      { path:'', redirectTo:'lista', pathMatch:'full'},
      { path: 'lista', component: ListaPlatillosComponent },         
      { path: 'formulario/:modo', component: FormPlatilloComponent }              
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatillosRoutingModule { }

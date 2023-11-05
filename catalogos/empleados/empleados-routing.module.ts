import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { FormEmpleadoComponent } from './form-empleado/form-empleado.component';

const routes: Routes = [
  { path: '', component: IndexComponent, 
    children: [
      { path: '', redirectTo: 'lista', pathMatch:'full' },   
      { path: 'lista', component: ListaEmpleadosComponent },   
      { path: 'formulario/:modo', component: FormEmpleadoComponent } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { newDashboardComponent } from './component/mainDashboard/dashboard.component'

const routes: Routes = [
  {path: '', component: newDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

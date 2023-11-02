import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children: [   
      { path: '', loadChildren: () => import('../autenticacion/login/login.module').then(m => m.LoginModule)},
      { path: 'Login', loadChildren: () => import('../autenticacion/login/login.module').then(m => m.LoginModule)},            
      { path: 'registrarse', loadChildren: () => import('../autenticacion/registro/registro.module').then(m => m.RegistroModule)},            
      { path: 'dashboard', loadChildren: () => import('../home/components/newdashboard/newdashboard.module').then(m => m.NewdashboardModule)},
      { path: 'empleados', loadChildren: () => import('../catalogos/empleados/empleados.module').then(m => m.EmpleadosModule) },
      { path: 'platillos', loadChildren: () => import('../catalogos/platillos/platillos.module').then(m => m.PlatillosModule) },      
      { path: 'usuarios', loadChildren: () => import('../catalogos/usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'configuraciones', loadChildren: () => import('../catalogos/configuraciones/configuraciones.module').then(m => m.ConfiguracionesModule) },
      { path: 'menus', loadChildren: () => import('../catalogos/menus/menus.module').then(m => m.MenusModule) },
      { path: 'operaciones', loadChildren: () => import('../operaciones/iniciar_operacion/operaciones.module').then(m => m.OperacionesModule) },
      { path: 'cocina', loadChildren: () => import('../operaciones/cocina/cocina.module').then(m => m.CocinaModule) },
      { path: 'caja', loadChildren: () => import('../operaciones/caja/caja.module').then(m => m.CajaModule) },
      { path: 'comandas', loadChildren: () => import('../operaciones/comandas/lista-comandas/comandas.module').then(m => m.ComandasModule) },
      { path: 'nueva_comanda', loadChildren: () => import('../operaciones/comandas/nueva-comanda/nueva-comanda.module').then(m => m.NuevaComandaModule)},
      { path: 'despachar_comanda', loadChildren: () => import('../operaciones/comandas/despachar-comanda/despachar-comanda.module').then(m => m.DespacharComandaModule)},
      { path: 'cancelar_comanda', loadChildren: () => import('../operaciones/comandas/cancelar-comanda/cancelar-comanda.module').then(m => m.CancelarComandaModule)}
    ]    
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

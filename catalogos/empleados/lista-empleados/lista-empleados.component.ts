import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//rxjs
import { Subject, takeUntil, take } from 'rxjs';
//model
import { EmpleadoI } from 'src/app/shared/model/catalogos/empleado';
//services
import { EmpleadosDbService } from '../../../shared/DbServices/catalogo/empleados-db.service';
//utils
import { IsLoadingService } from '@service-work/is-loading';
//confirm-dialog
import { ConfirmDialogComponent } from '../../../shared/componentes/confirm-dialog/componente/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
//Table
import { TableColumn } from '../../../shared/componentes/table/table-column';
//comunication interfaces
import { LayoutComService } from '../../../home/services/layout-com.service';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  empleados: EmpleadoI[] = [];
  unSub_empleados = new Subject<void>();
  tableColumns: TableColumn[] = []

  constructor(
    private router: Router,
    private empleadoDb: EmpleadosDbService,
    private loadSvc: IsLoadingService,
    private empleadoEditSelectionSvc: LayoutComService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getEmpleados()
    this.setTableColumns()
  }

  setTableColumns() {
    this.tableColumns = [
      { label: 'Nombre', def: 'nombreCompleto', dataKey: 'nombreCompleto' },
      { label: 'Email', def: 'email', dataKey: 'email' },
      { label: 'Departamento', def: 'departamento', dataKey: 'departamento.departamento', dataType: 'object' },
      { label: 'Puesto', def: 'puesto', dataKey: 'puesto.puesto', dataType: 'object' }
    ]
  }

  irFormularioAlta() {
    
  }

  ngOnDestroy(): void {
    this.unSub_empleados.next();
    this.unSub_empleados.complete();
  }

  getEmpleados() {
    const empleados_getting = this.empleadoDb.getEmpleados().pipe(takeUntil(this.unSub_empleados));
    this.loadSvc.add(empleados_getting, { key: 'loading' });
    empleados_getting.subscribe({
      next: (emps) => { this.empleados = emps },
      error: (error) => this.mostrarErrorMensaje(`Se produjo el siguiente error: ${error}`)
    });
  }

  registroSeleccionado(empleado: EmpleadoI) {
    this.empleadoEditSelectionSvc.informarEmpleadoEditar(empleado)
    setTimeout(() => {    
      this.router.navigate(['empleados/formulario/Edicion'])
    }, 800)
  }

  mostrarErrorMensaje(mensaje: string) {
    const dialogconfirm = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Se produjo lo siguiente:',
        message: mensaje,
        confirmText: 'Ok',
        cancelText: 'Cancelar',
        isErrorMsg: true
      }
    });
    dialogconfirm.afterClosed().pipe(take(1)).subscribe();
  }

  submit() {
    this.router.navigate(['/empleados/formulario/Alta']);
  }

  isLoading(key_loading: string): boolean {
    return this.loadSvc.isLoading({ key: key_loading })
  }
}

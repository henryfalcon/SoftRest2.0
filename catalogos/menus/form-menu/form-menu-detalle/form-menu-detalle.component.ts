import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
//models
import { PlatilloI } from '../../../../shared/model/catalogos/platillo';
import { MenuDetalleI } from '../../../../shared/model/catalogos/menu-detalle';
import { TableColumn } from 'src/app/shared/componentes/table/table-column';
//service
import { MenuDbService } from '../../../../shared/DbServices/catalogo/menu-db.service';
import { PlatilloDbService } from '../../../../shared/DbServices/catalogo/platillo-db.service';
//utils
import { IsLoadingService } from '@service-work/is-loading';
//confirm dialog
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/componentes/confirm-dialog/componente/confirm-dialog.component';
//rxjs
import { take } from 'rxjs';


@Component({
  selector: 'app-form-menu-detalle',
  templateUrl: './form-menu-detalle.component.html',
  styleUrls: ['./form-menu-detalle.component.css']
})
export class FormMenuDetalleComponent implements OnInit {
  @Input() set idMenu(idmenu: string){
    if (idmenu !== "" && idmenu != undefined){
      this.IdMenu = idmenu
      this.getMenuDetalle(this.idMenu)
    }    
    else{
      this.mostrarErrorMensaje('No paso el parametro Input idMenu')
    }
  }

  platillos: PlatilloI[] = [];
  menuDetalle: MenuDetalleI[] = []
  tableColumns: TableColumn[] = []
  IdMenu: string = ''

  detalleMenuForm: FormGroup = new FormGroup ({
    idMenu: new FormControl(''),
    idPlatillo: new FormControl(''),
    platillo: new FormControl(''),
    status: new FormControl(''),
    precio: new FormControl(''),
    iva: new FormControl(''),    
  })

  constructor(
    private detalleMenuDb: MenuDbService,
    private platilloDb: PlatilloDbService,
    private isLoadSvc: IsLoadingService,
    private dialog: MatDialog
  ) { }

  setTableColumns() {
    this.tableColumns= [      
      { label: 'Desc Larga', def: 'desc_larga', dataKey: 'desc_larga'},
      { label: 'Precio', def: 'precio', dataKey: 'precio'},
      { label: 'Iva', def: 'iva', dataKey: 'iva'},
      { label: 'Total', def: 'total', dataKey: 'total'},
      { label: 'Status', def: 'status', dataKey: 'status'},
    ]
  }

  ngOnInit(): void {
    this.setTableColumns()    
  }

  ngAfterViewInit(): void {    
  }

  getMenuDetalle(idMenu: string) {
    if (idMenu !== '') {
      const getting = this.detalleMenuDb.getMenuDetalle(idMenu)
      this.isLoadSvc.add(getting, {key:'loading'}) 
      getting.subscribe({
        next: (menudetalle) => {
          this.menuDetalle = menudetalle
        }
      })
    }
  }

  submit() {
    //
  }

  isLoading(key_loading: string): boolean{
    return this.isLoadSvc.isLoading({key:key_loading})
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
}

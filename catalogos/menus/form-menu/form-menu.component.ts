import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, Validators } from "@angular/forms";
import { ActivatedRoute, Router, Params } from '@angular/router';
//rxjs
import { Subject, take, takeUntil, forkJoin, Subscription } from 'rxjs';
//utils
import { IsLoadingService } from '@service-work/is-loading';
import { SnackBarService } from '../../../shared/utilidades/snackBarSvc/snack-bar.service';
//confirm-dialog
import { ConfirmDialogComponent } from '../../../shared/componentes/confirm-dialog/componente/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
//model
import { MenuI } from '../../../shared/model/catalogos/menu';
//services
import { MenuDbService } from 'src/app/shared/DbServices/catalogo/menu-db.service';
//Date
import { DateAdapter } from '@angular/material/core';
//interface communication
import { LayoutComService } from '../../../home/services/layout-com.service';
//material
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';

export type modo = 'Alta' | 'Edicion' | 'Sin'

@Component({
  selector: 'app-form-menu',
  templateUrl: './form-menu.component.html',
  styleUrls: ['./form-menu.component.css']
})
export class FormMenuComponent implements OnInit {
  @ViewChild(MatAccordion) matAccordion!: MatAccordion;
  @ViewChild(MatExpansionPanel) matPanel1!: MatExpansionPanel;

  //Common Variables 
  step: number = 0;
  unSubscribeQueryParams!: Subscription
  directivaFormulario!: FormGroupDirective
  tipoForm: modo = 'Sin'
  //Variables for Edition
  unSubscribeMenuEditar!: Subscription
  menu!: MenuI;

  menuForm: FormGroup = new FormGroup({
    idMenu: new FormControl(''),
    menu: new FormControl('', Validators.required),
    fecha_inicio: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    foto: new FormControl(''),
  })

  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private loadSvc: IsLoadingService,
    private menuDbSvc: MenuDbService,
    private snackBarMsg: SnackBarService,
    private dialog: MatDialog,
    private getMenuEditarSvc: LayoutComService,
    private dateAdapter: DateAdapter<Date>) { this.dateAdapter.setLocale('en-GB') }

  IniciarFormGroup() {
    this.menuForm.patchValue({
      idMenu: this.menu.idMenu,
      menu: this.menu.menu,
      fecha_inicio: this.menu.fecha_inicio,
      status: this.menu.status,
      foto: this.menu.foto
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.unSubscribeQueryParams = this.rutaActiva.params.subscribe((params: Params) => {
      this.tipoForm = this.rutaActiva.snapshot.params["modo"]
      if (this.tipoForm == 'Alta') {
        this.limpiarFormulario()
      }
      if (this.tipoForm == 'Edicion') {
        this.subToMenuEditar()
      }
    })
  }


  limpiarFormulario(): void {
    if (this.directivaFormulario != undefined) { this.directivaFormulario.resetForm() }
    this.menuForm.reset();
    this.menuForm.clearValidators();
  }

  isLoading(key_loading: string): boolean {
    return this.loadSvc.isLoading({ key: key_loading })
  }

  mostrarSnack(mensaje: string) {
    this.snackBarMsg.succes(mensaje)
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

  mostrarModalSiNo(pregunta: string, labelbutton1?: string, labelbutton2?: string) {
    const dialogconfirm = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirme',
        message: pregunta,
        confirmText: (labelbutton1 != undefined ? labelbutton1 : 'Si'),
        cancelText: (labelbutton2 != undefined ? labelbutton2 : 'No'),
        isYesNoDialog: true
      }
    }).afterClosed().pipe(take(1))
    return dialogconfirm
  }

  anyFormChange(): boolean {
    return this.menuForm.dirty
  }

  //PROCEDURES FOR EDITION TASKS

  subToMenuEditar() {
    setTimeout(() => {
      this.unSubscribeMenuEditar = this.getMenuEditarSvc.editarMenuSelected$.pipe(take(1))
        .subscribe({
          next: (menu) => {
            this.menu = menu
            this.IniciarFormGroup()
          }
        })
    }, 100);
  }

  validarEdicionMenu() {
    if (this.menuForm.invalid) {
      this.mostrarErrorMensaje('Existen campos sin rellenar o incorrectos. Valide el formulario. Gracias');
      return
    }
    this.mostrarModalSiNo('¿Desea guardar los datos del menu?').subscribe(
      {
        next: (res) => {
          const msjProceder = "Procediendo edicion de menu"
          const msjDescartar = "No se procedio edicion de menu"
          if (res) {
            this.mostrarSnack(msjProceder);
            this.guardarMenu()
          }
          else { this.mostrarSnack(msjDescartar); }
        }
      }
    );
  }

  guardarMenu() {
    const menuDatos: MenuI = this.menuForm.value
    const procesoEdicion = this.menuDbSvc.editMenu(menuDatos)
    this.loadSvc.add(procesoEdicion, { key: 'loading' })
    procesoEdicion.then((succes) => {
      this.snackBarMsg.succes('Menu Actualizado')
      this.irPrimerPanelMatAccordion()
    }, (error) => this.mostrarErrorMensaje(error))
  }

  irPrimerPanelMatAccordion() {
    this.matAccordion.closeAll();
    setTimeout(() => {
      this.matPanel1.open()
    }, 1000);
  }

  setStep(index: number) {
    this.step = index;
  };

  nextStep(index: number) {
    this.step++;
  };

  prevStep(index: number) {
    this.step--;
  };

  //SAVE BUTTON MAKES BIFURCATION BEETWEN NEW RECORD OR EDIT RECORD
  Guardar(formDirective: FormGroupDirective){
    if (this.directivaFormulario == undefined){this.directivaFormulario = formDirective}
    if (this.tipoForm == 'Alta') {
      this.validarAltaMenu()
    }
    if (this.tipoForm == 'Edicion') {
      this.validarEdicionMenu()
    }
  }

  //PROCEDURES FOR NEW RECORD TASKS

  validarAltaMenu() {
    if (this.menuForm.invalid) {
      this.mostrarErrorMensaje('Existen campos sin rellenar. Valide el formulario. Gracias');
      return
    }
    this.mostrarModalSiNo('¿Desea dar de alta al menu?').subscribe(
      {
        next: (res) => {
          const msjProceder = "Procediendo registro de menu"
          const msjDescartar = "No se procedio registro de menu"
          if (res) {
            this.mostrarSnack(msjProceder);
            this.altaMenu()
          }
          else { this.mostrarSnack(msjDescartar); }
        }
      }
    );
  }

  altaMenu() {
    const menuDatos: MenuI = this.menuForm.value
    const procesoAlta = this.menuDbSvc.addMenu(menuDatos)
    this.loadSvc.add(procesoAlta, { key: 'loading' })
    procesoAlta.then(
      (succes) => {
        const mensajesucces = 'Menu Registrado. ¿Desea Continuar o Salir?'
        this.mostrarModalSiNo(mensajesucces, 'Salir', 'Continuar')
          .subscribe({
            next: (resp) => {
              if (resp) {  //Salir
                this.router.navigate(['/menus/lista'])
              } else {  //Continuar
                this.limpiarFormulario()
                this.irPrimerPanelMatAccordion()
              }
            }
          })
      },
      (error) => this.mostrarErrorMensaje(error))
  }

  //FOR PHOTO SECTION EDITION
  public get idMenu(): string {
    return this.menuForm.controls['idMenu'].value
  }

  public get imageSrc(): string {
    return this.menuForm.controls['foto'].value
  }

  fotoMenuUrl(url: any) {
    if (url) {
      const id = this.menuForm.controls['id_menu'].value
      this.menuDbSvc.guardarFotoUrl(id, url).then(
        () => {
          this.mostrarSnack("Se ha guardado la imagen seleccionada")
        }, error => {
          this.mostrarErrorMensaje(error)
        }
      )
    }
  }
}

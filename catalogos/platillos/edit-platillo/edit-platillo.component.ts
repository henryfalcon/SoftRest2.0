import { Component, OnInit, ViewChild } from '@angular/core';
//rxjs
import { Subject, Subscription, take, takeUntil } from 'rxjs';
//forms
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
//services
import { PlatilloDbService } from 'src/app/shared/DbServices/catalogo/platillo-db.service';
import { CategoriaPlatillosDbService } from 'src/app/shared/DbServices/catalogo/categoria-platillos.service';
//utils
import { IsLoadingService } from '@service-work/is-loading';  
import { SnackBarService } from '../../../shared/utilidades/snackBarSvc/snack-bar.service';
import { ConfirmDialogComponent } from '../../../shared/componentes/confirm-dialog/componente/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
//Date
import { DateAdapter } from '@angular/material/core';
//material
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
//interface communication
import { LayoutComService } from '../../../home/services/layout-com.service';
//model
import { PlatilloI } from 'src/app/shared/model/catalogos/platillo';
import { CategoriaPlatilloI } from 'src/app/shared/model/catalogos/categoria-platillo';

@Component({
  selector: 'app-edit-platillo',
  templateUrl: './edit-platillo.component.html',
  styleUrls: ['./edit-platillo.component.css']
})
export class EditPlatilloComponent implements OnInit {

  @ViewChild(MatAccordion) matAccordion!: MatAccordion;
  @ViewChild(MatExpansionPanel) matPanel1!: MatExpansionPanel;

  step: number = 0;
  platillo!: PlatilloI;
  categorias!: CategoriaPlatilloI[]
  
  unSubscribePlatilloEditar!: Subscription
  unSubcribeCategorias = new Subject<void>();

  fotografia_selected: any = undefined;

  constructor(
    private platilloDb: PlatilloDbService,
    private categoriaDb: CategoriaPlatillosDbService,
    private getPlatilloEditarSvc: LayoutComService,
    private loadSvc: IsLoadingService,
    private snackBarMsg: SnackBarService,
    private dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>) { this.dateAdapter.setLocale('en-GB') }

    platilloForm: FormGroup = new FormGroup({
      idPlatillo: new FormControl('', Validators.required),
      desc_corta: new FormControl('', Validators.required),
      desc_larga: new FormControl('', Validators.required),
      ingredientes: new FormControl(''),
      acompanamiento: new FormControl(''),
      guarnicion: new FormControl(''),
      idCategoria: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      costo: new FormControl('', Validators.pattern("^[0-9]*$")), 
      precio: new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.required]), 
      status: new FormControl(''),
      tiempo_preparacion: new FormControl('', Validators.pattern("^[0-9]*$")),
      tiempo_alimento: new FormControl(''),
      imagen: new FormControl(''),
      dashboard: new FormControl(''),
      fecha_alta:  new FormControl('', Validators.required),
    });

    IniciarFormGroup() {
      this.platilloForm.patchValue({
        idPlatillo: this.platillo.idPlatillo,
        desc_corta: this.platillo.desc_corta,
        desc_larga: this.platillo.desc_larga,
        ingredientes: this.platillo.ingredientes,
        acompanamiento: this.platillo.acompanamiento,
        guarnicion: this.platillo.guarnicion,
        idCategoria: this.platillo.idCategoria,
        categoria: this.platillo.categoria,
        costo: this.platillo.costo,
        precio: this.platillo.precio,
        status: this.platillo.status,
        tiempo_preparacion: this.platillo.tiempo_preparacion,
        tiempo_alimento: this.platillo.tiempo_alimento,
        imagen: this.platillo.imagen,
        dashboard: this.platillo.dashboard,
        fecha_alta:  this.platillo.fecha_alta
      })
  }  

  public get idPlatillo() : string {
    return this.platilloForm.controls['idPlatillo'].value
  }
  
  public get imageSrc() : string {
    return this.platilloForm.controls['imagen'].value
  }

  ngOnInit(): void {
  }

  get_Data_Alterna() {    
    const categoriasLoading = this.categoriaDb.getCategoriaPlatillos().pipe(takeUntil(this.unSubcribeCategorias));
    this.loadSvc.add(categoriasLoading, {key:'loading'})
    categoriasLoading.subscribe({next: (cats)=>{          
      this.categorias = cats
      this.IniciarFormGroup()
    }})
  }

  subToPlatilloEditar(){
    setTimeout(() => {
      this.unSubscribePlatilloEditar = this.getPlatilloEditarSvc.editarPlatilloSelected$
      .subscribe({
        next: (platillo) => {           
          this.platillo = platillo          
          this.get_Data_Alterna()          
        }
      })
    }, 100);
  }

  ngAfterViewInit(): void {
    this.subToPlatilloEditar()

  }

  ngOnDestroy(): void {
    this.unSubscribePlatilloEditar.unsubscribe();     
    this.unSubcribeCategorias.next()
    this.unSubcribeCategorias.complete()
  }

  limpiarFormulario(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
    this.platilloForm.reset();
    this.platilloForm.clearValidators();
  }

  anyFormChange(): boolean {
    return this.platilloForm.dirty
  }

  validarEdicionPlatillo(formDirective: FormGroupDirective) {0
    if (this.platilloForm.invalid) {
      this.mostrarErrorMensaje('Existen campos sin rellenar. Valide el formulario. Gracias');
      return      
    }     
    this.mostrarModalSiNo('¿Desea guardar los datos del platillo?').subscribe(
      {next: (res)=> {
        const msjProceder = "Procediendo edicion de platillo"
        const msjDescartar = "No se procedio edicion de platillo"
        if (res) {           
          this.mostrarSnack(msjProceder); 
          this.guardarPlatillo(formDirective) 
        }
        else { this.mostrarSnack(msjDescartar); }
      }}
    );    
  }

  irPrimerPanelMatAccordion(){
      this.matAccordion.closeAll();
    setTimeout(() => {
      this.matPanel1.open()
    }, 1000);
  }

  guardarPlatillo(formDirective: FormGroupDirective) {
    const platilloDatos: PlatilloI = this.platilloForm.value 
    const procesoEdicion = this.platilloDb.editPlatillo(platilloDatos)
    this.loadSvc.add(procesoEdicion, {key:'loading'})
    procesoEdicion.then((succes) => {     
      this.snackBarMsg.succes('Platillo Actualizado')
      this.irPrimerPanelMatAccordion()
    }, (error) => this.mostrarErrorMensaje(error))
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

  setStep(index: number) {
    this.step = index;
  };

  nextStep(index: number) {
    this.step++;
  };

  prevStep(index: number) {
    this.step--;
  };

  fotoPlatilloUrl(url: any) {
    if (url) {
      this.platilloDb.guardarFotoUrl(this.platillo.idPlatillo, url).then(
        (res) => { 
          this.mostrarSnack("Se ha guardado la imagen seleccionada")
        }
      )
    }
  }
}

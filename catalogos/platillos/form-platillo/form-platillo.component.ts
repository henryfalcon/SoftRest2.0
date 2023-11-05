import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
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

export type modo = 'Alta' | 'Edicion' | 'Sin'

@Component({
  selector: 'app-form-platillo',
  templateUrl: './form-platillo.component.html',
  styleUrls: ['./form-platillo.component.css']
})
export class FormPlatilloComponent implements OnInit {
  @ViewChild(MatAccordion) matAccordion!: MatAccordion;
  @ViewChild(MatExpansionPanel) matPanel1!: MatExpansionPanel;

  step: number = 0;
  platillo!: PlatilloI;
  categorias: CategoriaPlatilloI[] = []
  tipoForm: modo = 'Sin'    
  unSubscribePlatilloEditar!: Subscription
  unSubcribeCategorias = new Subject<void>();
  unSubscribeQueryParams!: Subscription
  directivaFormulario!: FormGroupDirective

  fotografia_selected: any = undefined;

  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private platilloDb: PlatilloDbService,
    private categoriaDb: CategoriaPlatillosDbService,
    private getPlatilloEditarSvc: LayoutComService,
    private loadSvc: IsLoadingService,
    private snackBarMsg: SnackBarService,
    private dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>) { this.dateAdapter.setLocale('en-GB') }

    platilloForm: FormGroup = new FormGroup({
      idPlatillo: new FormControl(''),
      desc_corta: new FormControl('', Validators.required),
      desc_larga: new FormControl('', Validators.required),
      ingredientes: new FormControl(''),
      receta: new FormControl(''),
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
      fecha_alta:  new FormControl(''),
    });

    IniciarFormGroup() {
      this.platilloForm.patchValue({
        idPlatillo: this.platillo.idPlatillo,
        desc_corta: this.platillo.desc_corta,
        desc_larga: this.platillo.desc_larga,
        ingredientes: this.platillo.ingredientes,
        receta: this.platillo.receta,
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
  
  ngOnInit(): void {        
  }

  ngAfterViewInit(): void {    
    this.unSubscribeQueryParams = this.rutaActiva.params.subscribe((params: Params) => {
      this.tipoForm = this.rutaActiva.snapshot.params["modo"]   
      if (this.tipoForm == 'Alta') {      
        this.limpiarFormulario()        
        this.get_Data_Alterna()                      
      }
      if (this.tipoForm == 'Edicion') {              
        this.subToPlatilloEditar()
      }      
    })    
  }
  
  ngOnDestroy(): void {  
    this.unSubcribeCategorias.next()
    this.unSubcribeCategorias.complete()
    if (this.unSubscribePlatilloEditar != undefined){
      this.unSubscribePlatilloEditar.unsubscribe();
    }     
    this.unSubscribeQueryParams.unsubscribe();
  }

  limpiarFormulario(): void {
    if (this.directivaFormulario != undefined) { this.directivaFormulario.resetForm() }
    this.platilloForm.reset();
    this.platilloForm.clearValidators();
    //section for controls with no field in html. Remove as long as implemented in view
    this.platilloForm.controls['dashboard'].setValue(false)
    this.platilloForm.controls['imagen'].setValue('')
  }

  get_Data_Alterna() {    
    if (!this.matPanel1.expanded){ this.irPrimerPanelMatAccordion() }            
    if ((this.categorias.length == 0) || (this.categorias.length == 0)){
      const categoriasLoading = this.categoriaDb.getCategoriaPlatillos().pipe(takeUntil(this.unSubcribeCategorias));
      this.loadSvc.add(categoriasLoading, {key:'loading'})
      categoriasLoading.subscribe({next: (cats)=>{          
        this.categorias = cats        
      }})
    }    
  }  
    
  anyFormChange(): boolean {
    return this.platilloForm.dirty
  }
  
  irPrimerPanelMatAccordion(){
    this.matAccordion.closeAll();
    setTimeout(() => {
      this.matPanel1.open()
    }, 1000);
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

  onCategoriaSelection(event: any){
    const idCategoria = this.platilloForm.controls['idCategoria'].getRawValue();
    this.setCategoriaFormValue(idCategoria);  
  } 

  setCategoriaFormValue(idCategoria: string) {
    this.categorias.forEach(ele=>{
      if (ele.idCategoria == idCategoria) { this.platilloForm.controls['categoria'].setValue(ele.descripcion) }
    })    
  } 

  //SAVE BUTTON MAKES BIFURCATION BEETWEN NEW RECORD OR EDIT RECORD

  Guardar(formDirective: FormGroupDirective){
    if (this.directivaFormulario == undefined){this.directivaFormulario = formDirective}
    if (this.tipoForm == 'Alta') {
      this.validarAltaPlatillo()
    }
    if (this.tipoForm == 'Edicion') {
      this.validarEdicionPlatillo()
    }
  }
  
  //PROCEDURES FOR EDITION TASKS

  subToPlatilloEditar(){
    setTimeout(() => {
      this.unSubscribePlatilloEditar = this.getPlatilloEditarSvc.editarPlatilloSelected$
      .subscribe({
        next: (platillo) => {                     
          this.platillo = platillo          
          this.get_Data_Alterna()          
          this.IniciarFormGroup()          
        }
      })
    }, 100);  
  }

  validarEdicionPlatillo() {
    if (this.platilloForm.invalid) {
      this.mostrarErrorMensaje('Existen campos sin rellenar o incorrectos. Valide el formulario. Gracias');
      return      
    }     
    this.mostrarModalSiNo('¿Desea guardar los datos del platillo?').subscribe(
      {next: (res)=> {
        const msjProceder = "Procediendo edicion de platillo"
        const msjDescartar = "No se procedio edicion de platillo"
        if (res) {           
          this.mostrarSnack(msjProceder); 
          this.guardarPlatillo() 
        }
        else { this.mostrarSnack(msjDescartar); }
      }}
    );
  }

  guardarPlatillo() {
    const platilloDatos: PlatilloI = this.platilloForm.value 
    const procesoEdicion = this.platilloDb.editPlatillo(platilloDatos)
    this.loadSvc.add(procesoEdicion, {key:'loading'})
    procesoEdicion.then((succes) => {     
      this.snackBarMsg.succes('Platillo Actualizado')
      this.irPrimerPanelMatAccordion()
    }, (error) => this.mostrarErrorMensaje(error))
  }

  
  //PROCEDURES FOR NEW RECORD TASKS

  
  validarAltaPlatillo(){    
    if (this.platilloForm.invalid) {      
      this.mostrarErrorMensaje('Existen campos sin rellenar. Valide el formulario. Gracias');
      return      
    }     
    this.mostrarModalSiNo('¿Desea dar de alta al platillo?').subscribe(
      {next: (res)=> {
        const msjProceder = "Procediendo registro de platillo"
        const msjDescartar = "No se procedio registro de platillo"
        if (res) { 
          this.mostrarSnack(msjProceder); 
          this.altaPlatillo() 
        }
        else { this.mostrarSnack(msjDescartar); }
      }}
    );
  }
  
  altaPlatillo(){    
    const platilloDatos: PlatilloI = this.platilloForm.value
    platilloDatos.status = 'Alta '    
    const procesoAlta = this.platilloDb.addPlatillo(platilloDatos)
    this.loadSvc.add(procesoAlta, {key:'loading'}) 
    procesoAlta.then(
      (succes) => { 
        const mensajesucces = 'Platillo Registrado. ¿Desea Continuar o Salir?'
        this.mostrarModalSiNo(mensajesucces, 'Salir', 'Continuar')
          .subscribe({next: (resp) => {
            if (resp) {  //Salir
              this.router.navigate(['/platillos/lista'])
            } else {  //Continuar
              this.limpiarFormulario()
              this.irPrimerPanelMatAccordion()
            }
          }})
      },
      (error)  => this.mostrarErrorMensaje(error))
  }  
  
  //FOR PHOTO SECTION EDITION
  
  fotoPlatilloUrl(url: any) {
    if (url) {
      this.platilloDb.guardarFotoUrl(this.platillo.idPlatillo, url).then(
        (res) => { 
          this.mostrarSnack("Se ha guardado la imagen seleccionada")
        }
        )
      }
  }
    
  public get idPlatillo(): string {
      return this.platilloForm.controls['idPlatillo'].value
  }
    
  public get imageSrc(): string {
    return this.platilloForm.controls['imagen'].value
  }
}

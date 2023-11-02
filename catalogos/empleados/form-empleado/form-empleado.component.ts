import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
//rxjs
import { Subject, take, takeUntil, forkJoin, Subscription } from 'rxjs';
//forms
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
//model
import { DepartamentoI } from 'src/app/shared/model/catalogos/departamento';
import { PuestoI } from 'src/app/shared/model/catalogos/puesto';
import { EmpleadoI } from 'src/app/shared/model/catalogos/empleado';
//services
import { EmpleadosDbService } from '../../../shared/DbServices/catalogo/empleados-db.service';
import { DepartamentoDbService } from 'src/app/shared/DbServices/catalogo/departamento.service';
import { PuestoDbService } from '../../../shared/DbServices/catalogo/puesto-db.service';
//utils
import { IsLoadingService } from '@service-work/is-loading';
import { SnackBarService } from '../../../shared/utilidades/snackBarSvc/snack-bar.service';
//confirm-dialog
import { ConfirmDialogComponent } from '../../../shared/componentes/confirm-dialog/componente/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
//Date
import { DateAdapter } from '@angular/material/core';
//material
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
//interface communication
import { LayoutComService } from '../../../home/services/layout-com.service';

export type modo = 'Alta' | 'Edicion' | 'Sin'

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {
  @ViewChild(MatAccordion) matAccordion!: MatAccordion;
  @ViewChild(MatExpansionPanel) matPanel1!: MatExpansionPanel;  

  //Common Variables 
  step: number = 0;
  departamentos: DepartamentoI[] = [];
  puestos: PuestoI[] = [];
  unSubscribeDeptos = new Subject<void>();
  unSubscribePuestos = new Subject<void>();
  unSubscribeQueryParams!: Subscription
  selectedPuestoDefault = "";
  directivaFormulario!: FormGroupDirective
  tipoForm: modo = 'Sin'  
  //Variables for Edition
  unSubscribeEmpleadoEditar!: Subscription  
  empleado!: EmpleadoI;

  constructor( 
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private empleadoDb: EmpleadosDbService, 
    private puestoDB: PuestoDbService, 
    private deptoDb: DepartamentoDbService,
    private loadSvc: IsLoadingService,
    private snackBarMsg: SnackBarService,
    private dialog:  MatDialog,
    private getEmpleadoEditarSvc: LayoutComService,
    private dateAdapter: DateAdapter<Date> ) { this.dateAdapter.setLocale('en-GB') 
  }

  empleadoForm: FormGroup = new FormGroup({
    idEmpleado: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    aPaterno: new FormControl('', Validators.required),
    aMaterno: new FormControl(''),
    sexo: new FormControl('', Validators.required),
    tipoSanguineo: new FormControl(''),
    nacionalidad: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required),
    fechaContrato: new FormControl('', Validators.required),
    tipoContrato: new FormControl(''),
    idDepto: new FormControl(''),
    departamento: new FormControl(''),
    idPuesto: new FormControl(''),
    puesto: new FormControl(''),
    email: new FormControl('email@mail.com', Validators.email),
    contacto: new FormControl(''),
    telCelular: new FormControl('', Validators.pattern('[- +()0-9]{10,12}')),
    telContacto: new FormControl('', Validators.pattern('[- +()0-9]{10,12}')),
    telCasa: new FormControl('', Validators.pattern('[- +()0-9]{10,12}')),
    ciudad: new FormControl(''),    
    estado: new FormControl(''),
    mpio: new FormControl(''),
    colonia: new FormControl(''),
    codPostal: new FormControl('', [Validators.minLength(5), Validators.pattern("^[0-9]*$")]),
    calle: new FormControl(''),
    mza: new FormControl('', Validators.pattern("^[0-9]*$")),
    lote: new FormControl('', Validators.pattern("^[0-9]*$")),
    noExt: new FormControl('', Validators.pattern("^[0-9]*$")),
    noInt: new FormControl('', Validators.pattern("^[0-9]*$")),
    pais: new FormControl(''),
    foto: new FormControl('')
  });

  IniciarFormGroup() {  
    this.empleadoForm.patchValue({
      idEmpleado: this.empleado.idEmpleado,      
      nombre: this.empleado.nombre,
      aPaterno: this.empleado.aPaterno,
      aMaterno: this.empleado.aMaterno,
      sexo: this.empleado.sexo,
      tipoSanguineo: this.empleado.tipoSanguineo,
      nacionalidad: this.empleado.nacionalidad,
      fechaNacimiento: this.empleado.fechaNacimiento,
      fechaContrato: this.empleado.fechaContrato,
      tipoContrato: this.empleado.tipoContrato,
      idDepto: this.empleado.departamento.idDepto,
      departamento: this.empleado.departamento.departamento,
      idPuesto: this.empleado.puesto.idPuesto,
      puesto: this.empleado.puesto.puesto,
      email: this.empleado.contacto.email,
      telCelular: this.empleado.contacto.telCelular,
      contacto: this.empleado.contacto.contacto,
      telContacto: this.empleado.contacto.telContacto,
      telCasa: this.empleado.contacto.telCasa,
      ciudad: this.empleado.direccion.ciudad,
      codPostal: this.empleado.direccion.codPostal,
      estado: this.empleado.direccion.estado,
      mpio: this.empleado.direccion.mpio,
      colonia: this.empleado.direccion.colonia,
      calle: this.empleado.direccion.calle,
      mza: this.empleado.direccion.mza,
      lote: this.empleado.direccion.lote,
      noExt: this.empleado.direccion.noExt,
      noInt: this.empleado.direccion.noInt,
      pais: this.empleado.direccion.pais,
      foto: this.empleado.foto
    })
    const idDepto = this.empleadoForm.controls['idDepto'].getRawValue();
    this.puestos.forEach(ele =>{
      if (ele.idDepto == idDepto ){
        ele.deshabilitar=false
      } 
      else {
        ele.deshabilitar=true
      }           
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
        this.subToEmpleadoEditar()
      }      
    })
  }

  get_Data_Alterna() {
    if (!this.matPanel1.expanded){ this.irPrimerPanelMatAccordion() }            
    if ((this.puestos.length == 0) || (this.departamentos.length == 0)){
      setTimeout(() => {            
        const puestos = this.puestoDB.getPuestos().pipe(take(1))
        const deptos = this.deptoDb.getDepartamentos().pipe(take(1))
        const deptosYpuestos = forkJoin({ deptos, puestos })
        this.loadSvc.add(deptosYpuestos, {key:'loading'})
        deptosYpuestos.subscribe({
          next: (deps_puestos) => {
            this.departamentos = deps_puestos.deptos
            this.puestos = deps_puestos.puestos               
          }, error: (error) => this.mostrarErrorMensaje(`Se produjo el siguiente error: ${error}`)
        })
      }, 100);
    }      
  }

  ngOnDestroy(): void {
    this.unSubscribeDeptos.next();
    this.unSubscribeDeptos.complete();
    this.unSubscribePuestos.next();
    this.unSubscribePuestos.complete();    
    if (this.unSubscribeEmpleadoEditar != undefined){
      this.unSubscribeEmpleadoEditar.unsubscribe();
    }     
    this.unSubscribeQueryParams.unsubscribe();
  }

  limpiarFormulario(): void { 
    if (this.directivaFormulario != undefined) { this.directivaFormulario.resetForm() }
    this.empleadoForm.reset();
    this.empleadoForm.clearValidators();    
  }

  setDepartamentoFormValue(idDepto: string) {
    this.departamentos.forEach(ele=>{
      if (ele.idDepto == idDepto) { this.empleadoForm.controls['departamento'].setValue(ele.departamento) }
    })    
  } 

  onPuestoSelection(event: any){
    const idPuesto = this.empleadoForm.controls['idPuesto'].getRawValue();
    this.puestos.forEach(ele=>{
      if (ele.idPuesto == idPuesto) {
        this.empleadoForm.controls['puesto'].setValue(ele.puesto)
      }
    })        
  }

  onDepartamentoSelection(event: any){
    const idDepto = this.empleadoForm.controls['idDepto'].getRawValue();
    this.setDepartamentoFormValue(idDepto);
    this.puestos.forEach(ele=>{
      if (ele.idDepto == idDepto){
        ele.deshabilitar = false
      } 
      else { 
        ele.deshabilitar = true 
      }
    });
    this.selectedPuestoDefault = "Seleccione"
    this.empleadoForm.controls['puesto'].setValue('');
  } 

  getNombreCompleto(emp: EmpleadoI): string {
    const nombre = emp.nombre;
    const apaterno = emp.aPaterno;
    const amaterno = emp.aMaterno    
    return `${nombre} ${apaterno} ${amaterno}`
  }

  isLoading(key_loading: string): boolean {
    return this.loadSvc.isLoading({key: key_loading})
  }

  mostrarSnack(mensaje: string){
    this.snackBarMsg.succes(mensaje)
  }

  mostrarErrorMensaje(mensaje: string) {
    const dialogconfirm = this.dialog.open(ConfirmDialogComponent, {
      data: { title:'Se produjo lo siguiente:', 
              message:mensaje, 
              confirmText: 'Ok',
              cancelText: 'Cancelar',              
              isErrorMsg: true }
    });
    dialogconfirm.afterClosed().pipe(take(1)).subscribe();
  }

  mostrarModalSiNo(pregunta: string, labelbutton1?: string, labelbutton2?: string) {
    const dialogconfirm = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Confirme',
      message: pregunta,
      confirmText: (labelbutton1 != undefined? labelbutton1 : 'Si'),
      cancelText: (labelbutton2 != undefined? labelbutton2 : 'No'),
      isYesNoDialog: true
    }}).afterClosed().pipe(take(1))
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
 
  anyFormChange(): boolean {
    return this.empleadoForm.dirty
  }

  irPrimerPanelMatAccordion() {
    this.matAccordion.closeAll();
    setTimeout(() => {
      this.matPanel1.open()
    }, 1000);
  }

  //SAVE BUTTON MAKES BIFURCATION BEETWEN NEW RECORD OR EDIT RECORD
  Guardar(formDirective: FormGroupDirective){
    if (this.directivaFormulario == undefined){this.directivaFormulario = formDirective}
    if (this.tipoForm == 'Alta') {
      this.validarAltaEmpleado()
    }
    if (this.tipoForm == 'Edicion') {
      this.validarEdicionEmpleado()
    }
  }

  //PROCEDURES FOR EDITION TASKS

  subToEmpleadoEditar(){
    setTimeout(() => {
      this.unSubscribeEmpleadoEditar = this.getEmpleadoEditarSvc.editarEmpleadoSelected$.pipe(take(1))
      .subscribe({      
        next: (empleado) => {           
          this.empleado = empleado
          this.get_Data_Alterna();
          this.IniciarFormGroup()          
        }
      })
    }, 100);
  }

  validarEdicionEmpleado() {
    if (this.empleadoForm.invalid) {
      this.mostrarErrorMensaje('Existen campos sin rellenar o incorrectos. Valide el formulario. Gracias');
      return      
    }     
    this.mostrarModalSiNo('¿Desea guardar los datos del empleado?').subscribe(
      {next: (res)=> {
        const msjProceder = "Procediendo edicion de empleado"
        const msjDescartar = "No se procedio edicion de empleado"
        if (res) {           
          this.mostrarSnack(msjProceder); 
          this.guardarEmpleado() 
        }
        else { this.mostrarSnack(msjDescartar); }
      }}
    );    
  }

  guardarEmpleado() {
    const empleadoDatos: EmpleadoI = this.empleadoForm.value 
    empleadoDatos.nombreCompleto = this.getNombreCompleto(empleadoDatos)
    const procesoEdicion = this.empleadoDb.editEmpleado(empleadoDatos)
    this.loadSvc.add(procesoEdicion, {key:'loading'})
    procesoEdicion.then((succes) => {     
      this.snackBarMsg.succes('Empleado Actualizado')
      this.irPrimerPanelMatAccordion()
    }, (error) => this.mostrarErrorMensaje(error))
  }

  //PROCEDURES FOR NEW RECORD TASKS

  validarAltaEmpleado(){
    if (this.empleadoForm.invalid) {
      this.mostrarErrorMensaje('Existen campos sin rellenar. Valide el formulario. Gracias');
      return      
    }     
    this.mostrarModalSiNo('¿Desea dar de alta al empleado?').subscribe(
      {next: (res)=> {
        const msjProceder = "Procediendo registro de empleado"
        const msjDescartar = "No se procedio registro de empleado"
        if (res) { 
          this.mostrarSnack(msjProceder); 
          this.altaEmpleado() 
        }
        else { this.mostrarSnack(msjDescartar); }
      }}
    );
  }
  
  altaEmpleado(){    
    const empleadoDatos: EmpleadoI = this.empleadoForm.value
    empleadoDatos.status = 'Alta '
    empleadoDatos.nombreCompleto = this.getNombreCompleto(empleadoDatos)
    const procesoAlta = this.empleadoDb.addEmpleado(empleadoDatos)
    this.loadSvc.add(procesoAlta, {key:'loading'}) 
    procesoAlta.then(
      (succes) => { 
        const mensajesucces = 'Empleado Registrado. ¿Desea Continuar o Salir?'
        this.mostrarModalSiNo(mensajesucces, 'Salir', 'Continuar')
          .subscribe({next: (resp) => {
            if (resp) {  //Salir
              this.router.navigate(['/empleados/lista'])
            } else {  //Continuar
              this.limpiarFormulario()
              this.irPrimerPanelMatAccordion()
            }
          }})
      },
      (error)  => this.mostrarErrorMensaje(error))
  }  

  //FOR PHOTO SECTION EDITION
  public get idEmpleado() : string {
    return this.empleadoForm.controls['idEmpleado'].value
  }
  
  public get imageSrc() : string {
    return this.empleadoForm.controls['foto'].value
  }

  fotoEmpleadoUrl(url: any) {
    if (url) {
      const id = this.empleadoForm.controls['idEmpleado'].value
      this.empleadoDb.guardarFotoUrl(id, url).then(
        () => { 
          this.mostrarSnack("Se ha guardado la imagen seleccionada")          
        }, error => {
          this.mostrarErrorMensaje(error)
        }
      )
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//rxjs
import { Subject, take, takeUntil } from 'rxjs';
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

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.component.html',
  styleUrls: ['./alta-empleado.component.css']
})
export class AltaEmpleadoComponent implements OnInit {  
  @ViewChild(MatAccordion) matAccordion!: MatAccordion;
  @ViewChild(MatExpansionPanel) matPanel1!: MatExpansionPanel;  

  step: number = 0;
  departamentos: DepartamentoI[] = [];
  puestos: PuestoI[] = [];
  unSubscribeDeptos = new Subject<void>();
  unSubscribePuestos = new Subject<void>();
  selectedPuestoDefault="";

  constructor( 
    private router: Router,
    private empleadoDb: EmpleadosDbService, 
    private puestoDB: PuestoDbService, 
    private deptoDb: DepartamentoDbService,
    private loadSvc: IsLoadingService,
    private snackBarMsg: SnackBarService,
    private dialog:  MatDialog,
    private dateAdapter: DateAdapter<Date> ) { this.dateAdapter.setLocale('en-GB') }
    
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
  });

  IniciarFormGroup() {
    this.empleadoForm.setValue({
      idEmpleado: '',
      nombre: '',
      aPaterno: '',
      aMaterno: '',      
      tipoContrato: '',
      fechaNacimiento: '',
      fechaContrato: '',
      nacionalidad:'',
      sexo: '',
      tipoSanguineo: '',
      idDepto: '',
      departamento: '',
      idPuesto: '',
      puesto: '',
      email: '',
      telCelular: '',
      contacto: '',
      telContacto: '',
      telCasa: '',
      calle: '',
      mza: '',
      lote: '',
      noExt: '',
      noInt: '',
      colonia:  '',
      mpio:  '',
      ciudad: '',
      estado: '',
      codPostal: '',
      pais: '',
    })
  }

  ngOnInit(): void {
    this.IniciarFormGroup();
    this.get_Data_Alterna();
  }

  ngOnDestroy(): void {
    this.unSubscribeDeptos.next();
    this.unSubscribeDeptos.complete();
    this.unSubscribePuestos.next();
    this.unSubscribePuestos.complete();    
  }

  limpiarFormulario(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
    this.empleadoForm.reset();
    this.empleadoForm.clearValidators();
    this.matAccordion.closeAll();
    setTimeout(() => {
      this.matPanel1.open()
    }, 1000);    
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

  get_Data_Alterna() {
    const deptos = this.deptoDb.getDepartamentos().pipe(takeUntil(this.unSubscribeDeptos))
    const puestos = this.puestoDB.getPuestos().pipe(takeUntil(this.unSubscribePuestos));
    this.loadSvc.add(deptos,{'key':'loading'})
    this.loadSvc.add(puestos,{'key':'loading'})
    deptos.subscribe({ next: (deps)=> this.departamentos=deps, 
                       error: (error)=> this.mostrarErrorMensaje(`Se produjo el siguiente error: ${error}`)})
    puestos.subscribe({ next: (psts)=> {this.puestos=psts; this.puestos.forEach(ele=>ele.deshabilitar=false)},
                        error: (error)=> this.mostrarErrorMensaje(`Se produjo el siguiente error: ${error}`)})
  }

  validarAltaEmpleado(formDirective: FormGroupDirective){
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
          this.altaEmpleado(formDirective) 
        }
        else { this.mostrarSnack(msjDescartar); }
      }}
    );
  }

  getNombreCompleto(emp: EmpleadoI): string {
    const nombre = emp.nombre;
    const apaterno = emp.aPaterno;
    const amaterno = emp.aMaterno    
    return `${nombre} ${apaterno} ${amaterno}`
  }

  altaEmpleado(formDirective: FormGroupDirective){    
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
            if (resp) {
              this.router.navigate(['/empleados/lista'])
            } else {
              this.limpiarFormulario(formDirective)
            }
          }})
      },
      (error)  => this.mostrarErrorMensaje(error))
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

}

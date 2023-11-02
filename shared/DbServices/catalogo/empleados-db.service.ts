import { Injectable } from '@angular/core';
//firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
//rxjs
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
//models interfaces
import { EmpleadoI } from '../../model/catalogos/empleado';
import { PuestoI } from '../../model/catalogos/puesto';
import { FbErrorI } from '../../model/utilidad/fb-error';
import { DireccionI } from '../../model/catalogos/direccion';
import { ContactoI } from '../../model/catalogos/contacto';
import { DepartamentoI } from '../../model/catalogos/departamento';
//utils
import { TraducirErrores } from '../../utilidades/traducirError';
import { convertTimestamp } from 'convert-firebase-timestamp';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosDbService {
  private traductorError = new TraducirErrores();

  constructor(private afs: AngularFirestore) {}

  getEmpleado(id_empleado: string): Observable<EmpleadoI[]> {
    return this.afs.collection<EmpleadoI>('Empleados', ref => ref.where('id','==', id_empleado))
      .valueChanges().pipe(catchError(this.errorHandler));
  }

  getEmpleados() {
    return this.afs.collection<EmpleadoI>('Empleados').snapshotChanges().pipe(
      catchError(this.errorHandler),
      map( actions => 
        actions.map(a => { 
          const data = a.payload.doc.data() as EmpleadoI;                
          const newObj = this.transformDataToEmpleadoInterface(data)
          return  newObj ;})));
  }

  private transformDataToEmpleadoInterface(data: any): EmpleadoI{
    const direccionObj: DireccionI = {
      calle: data.calle,
      colonia: data.colonia,
      mza: data.mza,
      lote: data.lote,
      noExt: data.noExt,
      noInt: data.noInt,
      ciudad: data.ciudad,
      estado: data.estado,
      mpio: data.mpio,
      pais: data.pais,
      codPostal:data.codPostal
    }
    const contactoObj: ContactoI = {
      email: data.email,
      telCelular: data.telCelular,
      contacto: data.contacto,
      telContacto: data.telContacto,
      telCasa: data.telCasa
    }
    const departamentoObj: DepartamentoI = {
      idDepto: data.idDepto,
      departamento: data.departamento
    }
    const puestoObj: PuestoI = {      
      idPuesto: data.idPuesto,
      puesto: data.puesto
    }    
    data.direccion = direccionObj
    data.contacto = contactoObj
    data.puesto = puestoObj
    data.departamento = departamentoObj
 
    const f1: any = data.fechaNacimiento;
    const f2: any = convertTimestamp(f1);
    data.fechaNacimiento = f2;
    data.fechaNacStr = f2.toLocaleDateString();
    data.edad = this.CalcularEdad(f2)

    const f3: any = data.fechaContrato
    const f4: any = convertTimestamp(f3);
    data.fechaContrato = f4;
    data.fechaContratoStr = f4.toLocaleDateString();
  
    return data
  }

  CalcularEdad(fechanacimiento: Date): number {
    let edad = 0
    if (fechanacimiento){
      var timeDiff = Math.abs(Date.now() - new Date(fechanacimiento).getTime());
      edad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
    return edad
  }

  private get_strdate(fecha: Date): string {
    let a: Date = fecha;
    let strdate: string = 'seconds:' + (a.getTime()/1000).toString() + ', nanosecons: 0';    
    return strdate;
  }

  addEmpleado(empleado: EmpleadoI): Promise<Boolean> {
    let new_id = this.afs.createId()
    empleado.idEmpleado = new_id
    empleado.fechaNacStr = this.get_strdate(empleado.fechaNacimiento!)
    empleado.fechaContratoStr = this.get_strdate(empleado.fechaContrato)
    return this.afs.collection<EmpleadoI>('Empleados')
      .doc(new_id)
        .set(empleado)
          .then(() => { return true }
          ,error => { 
            const err = this.traductorError.traducir(error)
            throw new Error (err)
          })            
  } 

  editEmpleado(empleado: EmpleadoI): Promise<Boolean> {
    console.log(empleado)
    return this.afs.collection<EmpleadoI>('Empleados').doc(empleado.idEmpleado)
      .update(empleado).then(() => {return true}
                       ,error => {
                          const err = this.traductorError.traducir(error)
                          throw new Error (err)
                        }
      )
  }

  async guardarFotoUrl(idEmpleado: string, urlFoto: string) {
    let batch = this.afs.firestore.batch();
    let empleadoRef = this.afs.firestore.collection('Empleados').doc(idEmpleado)
    batch.update(empleadoRef, {foto:urlFoto})
    await batch.commit().then(()=>{return true}, (error)=>{
      const err = this.traductorError.traducir(error)
      throw new Error (err)      
    })
  }

  private errorHandler(error: FbErrorI) {
    let trans = new TraducirErrores();
    let errorMsg = trans.traducir(error);
    return throwError(()=>new Error(errorMsg));      
  }
}

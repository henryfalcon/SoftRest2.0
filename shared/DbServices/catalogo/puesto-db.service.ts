import { Injectable } from '@angular/core';
//rxjs
import { catchError, Observable, throwError } from 'rxjs';
//firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
//models interfaces
import { PuestoI } from '../../model/catalogos/puesto';
//utils
import { TraducirErrores } from '../../utilidades/traducirError';
import { FbErrorI } from '../../model/utilidad/fb-error';

@Injectable({
  providedIn: 'root'
})
export class PuestoDbService {

  constructor(private afs: AngularFirestore) {}

  getPuestos(){
    return this.afs.collection<PuestoI>('Puestos')
      .valueChanges().pipe(catchError(this.errorHandler));    
  }

  private errorHandler(error: FbErrorI) {
    let trans = new TraducirErrores();
    let errorMsg = trans.traducir(error);
    return throwError(()=>new Error(errorMsg));      
  }
}

import { Injectable } from '@angular/core';
//rxjs
import { catchError, Observable, throwError } from 'rxjs';
//firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
//models interfaces
import { DepartamentoI } from '../../model/catalogos/departamento';
//utils
import { TraducirErrores } from '../../utilidades/traducirError';
import { FbErrorI } from '../../model/utilidad/fb-error';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoDbService {

  constructor(private afs: AngularFirestore) {}

  getDepartamento(idDepto: string): Observable<DepartamentoI[]> {
    return this.afs.collection<DepartamentoI>('Departamentos', 
      ref => ref.where('idDepto','==', idDepto))
        .valueChanges().pipe(catchError(this.errorHandler));
  }

  getDepartamentos(): Observable<DepartamentoI[]> {
    return this.afs.collection<DepartamentoI>('Departamentos')
      .valueChanges().pipe(catchError(this.errorHandler));    
  }  

  private errorHandler(error: FbErrorI) {
    let trans = new TraducirErrores();
    let errorMsg = trans.traducir(error);
    return throwError(()=>new Error(errorMsg));      
  }
}

import { Injectable } from '@angular/core';
//firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
//rxjs
import { catchError, Observable, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
//model & interface
import { CajaI } from '../../../shared/model/operaciones/corte-caja';
import { DesgloseCajaI } from '../../../shared/model/operaciones/desglose_caja';
//utils
import { FbErrorI } from '../../../shared/model/utilidad/fb-error';
import { TraducirErrores } from '../../../shared/utilidades/traducirError';

@Injectable({
  providedIn: 'root'
})
export class CajaDbService {
  private traductorError = new TraducirErrores();

  constructor(private afs: AngularFirestore) {}

  getCaja(id_caja: string): Observable<CajaI[]>{
    return this.afs.collection<CajaI>('',ref =>
      ref.where('id_caja', '==', id_caja)).valueChanges()
        .pipe( catchError(this.errorHandler), take(1))

  }

  getcajas(): Observable<CajaI[]>{
    return this.afs.collection<CajaI>('caja').valueChanges().pipe(
      catchError(this.errorHandler)
    )
  }

  private errorHandler(error: FbErrorI) {
    let trans = new TraducirErrores();
    let errorMsg = trans.traducir(error);
    return throwError(()=>new Error(errorMsg));      
  }
}

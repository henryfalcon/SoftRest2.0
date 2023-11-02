import { Injectable } from '@angular/core';
//firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
//rxjs
import { catchError, Observable, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
//model & utils
import { ComandaI } from '../../../shared/model/operaciones/comandas';
import { comandaDetalleI } from '../../../shared/model/operaciones/comanda_detalle';
//utils
import { FbErrorI } from '../../../shared/model/utilidad/fb-error';
import { TraducirErrores } from '../../../shared/utilidades/traducirError';

@Injectable({
  providedIn: 'root'
})
export class ComandasDbService {
  private traductorError = new TraducirErrores();

  constructor(private afs: AngularFirestore) {}

  getComanda(id_Comanda: string): Observable<ComandaI[]>{
    return this.afs.collection<ComandaI>('',ref =>
      ref.where('id_Comanda', '==', id_Comanda)).valueChanges()
        .pipe( catchError(this.errorHandler), take(1))

  }

  getComandas(): Observable<ComandaI[]>{
    return this.afs.collection<ComandaI>('Comanda').valueChanges().pipe(
      catchError(this.errorHandler)
    )
  }

  private errorHandler(error: FbErrorI) {
    let trans = new TraducirErrores();
    let errorMsg = trans.traducir(error);
    return throwError(()=>new Error(errorMsg));      
  }
}

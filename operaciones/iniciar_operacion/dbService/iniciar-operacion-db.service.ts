import { Injectable } from '@angular/core';
//firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
//rxjs
import { catchError, Observable, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
//model & interface
import { OperacionI } from '../../../shared/model/operaciones/operacion-i';
//utils
import { FbErrorI } from '../../../shared/model/utilidad/fb-error';
import { TraducirErrores } from '../../../shared/utilidades/traducirError';

@Injectable({
  providedIn: 'root'
})
export class IniciarOperacionDbService {
  private traductorError = new TraducirErrores();

  constructor(private afs: AngularFirestore) {}

  private errorHandler(error: FbErrorI) {
    let trans = new TraducirErrores();
    let errorMsg = trans.traducir(error);
    return throwError(()=>new Error(errorMsg));      
  }
}

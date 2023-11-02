import { Injectable } from '@angular/core';
//firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
//rxjs
import { catchError, Observable, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
//models interfaces
import { ConfiguracionI } from '../../model/catalogos/configuracion';
//utils 
import { FbErrorI } from '../../model/utilidad/fb-error';
import { TraducirErrores } from '../../utilidades/traducirError';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionDbService {
  private traductorError = new TraducirErrores();

  constructor(private afs: AngularFirestore) {}

  getConfiguracion(id_configuracion: string): Observable<ConfiguracionI[]>{
    return this.afs.collection<ConfiguracionI>('Configuraciones',ref =>
      ref.where('id_configuracion', '==', id_configuracion)).valueChanges()
        .pipe( catchError(this.errorHandler), take(1))

  }

  getConfiguraciones(): Observable<ConfiguracionI[]>{
    return this.afs.collection<ConfiguracionI>('Configuraciones').valueChanges().pipe(
      catchError(this.errorHandler)
    )
  }

  private errorHandler(error: FbErrorI) {
    let trans = new TraducirErrores();
    let errorMsg = trans.traducir(error);
    return throwError(()=>new Error(errorMsg));      
  }
}

import { Injectable } from '@angular/core';
//firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
//rxjs
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
//models interfaces
import { CategoriaPlatilloI } from '../../model/catalogos/categoria-platillo';
//utils
import { TraducirErrores } from '../../utilidades/traducirError'
import { FbErrorI } from '../../model/utilidad/fb-error';

@Injectable({
  providedIn: 'root'
})
export class CategoriaPlatillosDbService {

  constructor(private afs: AngularFirestore) {}
  
  getCategoriaPlatillo(idCategoPlat: string): Observable<CategoriaPlatilloI[]> {
    return this.afs.collection<CategoriaPlatilloI>('CategoriaPlatillos', 
      ref => ref.where('idCategoriaPlatillo','==', idCategoPlat))
        .valueChanges().pipe(catchError(this.errorHandler));
  }

  getCategoriaPlatillos(): Observable<CategoriaPlatilloI[]> {
    return this.afs.collection<CategoriaPlatilloI>('CategoriaPlatillos')
      .valueChanges().pipe(catchError(this.errorHandler));    
  }  

  private errorHandler(error: FbErrorI) {
    let trans = new TraducirErrores();
    let errorMsg = trans.traducir(error);
    return throwError(()=>new Error(errorMsg));      
  }
}

import { Injectable } from '@angular/core';
//firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
//rxjs
import { catchError, Observable, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
//model & interface
import { UsuarioI } from '../../model/catalogos/usuario';
//utils
import { FbErrorI } from '../../model/utilidad/fb-error';
import { TraducirErrores } from '../../utilidades/traducirError';

@Injectable({
  providedIn: 'root'
})
export class UsuariosDbService {
  private traductorError = new TraducirErrores();

  constructor(private afs: AngularFirestore) {}

  getUsuario(id_Usuario: string): Observable<UsuarioI[]>{
    return this.afs.collection<UsuarioI>('Usuarios',ref =>
      ref.where('id_Usuario', '==', id_Usuario)).valueChanges()
        .pipe( catchError(this.errorHandler), take(1))

  }

  getUsuarios(): Observable<UsuarioI[]>{
    return this.afs.collection<UsuarioI>('Usuarios').valueChanges().pipe(
      catchError(this.errorHandler)
    )
  }

  private errorHandler(error: FbErrorI) {
    let trans = new TraducirErrores();
    let errorMsg = trans.traducir(error);
    return throwError(()=>new Error(errorMsg));      
  }
}

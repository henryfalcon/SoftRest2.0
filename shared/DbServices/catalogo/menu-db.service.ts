import { Injectable } from '@angular/core';
//firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
//rxjs
import { catchError, Observable, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
//model interface
import { MenuI } from '../../model/catalogos/menu';
import { MenuDetalleI } from '../../model/catalogos/menu-detalle';
//utils
import { TraducirErrores } from '../../utilidades/traducirError';
import { FbErrorI } from '../../model/utilidad/fb-error';


@Injectable({
  providedIn: 'root'
})
export class MenuDbService {
  private traductorError = new TraducirErrores();

  constructor(private afs: AngularFirestore) {}

  getMenu(id_Menu: string): Observable<MenuI[]>{
    return this.afs.collection<MenuI>('Menus',ref =>
      ref.where('id_Menu', '==', id_Menu)).valueChanges()
        .pipe( catchError(this.errorHandler), take(1))

  }

  getMenus(): Observable<MenuI[]>{
    return this.afs.collection<MenuI>('Menus').valueChanges().pipe(
      catchError(this.errorHandler)
    )
  }

  private errorHandler(error: FbErrorI) {
    let trans = new TraducirErrores();
    let errorMsg = trans.traducir(error);
    return throwError(()=>new Error(errorMsg));      
  }
}

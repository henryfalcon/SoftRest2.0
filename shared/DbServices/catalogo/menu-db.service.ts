import { Injectable } from '@angular/core';
//firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//rxjs
import { catchError, Observable, throwError, map } from 'rxjs';
import { take } from 'rxjs/operators';
//model interface
import { MenuI } from '../../model/catalogos/menu';
import { MenuDetalleI } from '../../model/catalogos/menu-detalle';
//utils
import { TraducirErrores } from '../../utilidades/traducirError';
import { FbErrorI } from '../../model/utilidad/fb-error';
import { convertTimestamp } from 'convert-firebase-timestamp';

@Injectable({
  providedIn: 'root'
})
export class MenuDbService {
  private traductorError = new TraducirErrores();

  constructor(private afs: AngularFirestore, private authFb: AngularFireAuth) {}

  getMenu(id_Menu: string): Observable<MenuI[]>{
    return this.afs.collection<MenuI>('Menus',ref =>
      ref.where('id_Menu', '==', id_Menu)).valueChanges()
        .pipe( catchError(this.errorHandler), take(1))

  }

  getMenus() {    
    return this.afs.collection<MenuI>('Menus').snapshotChanges().pipe(
      catchError(this.errorHandler),
      map( actions => 
        actions.map(a => { 
          const data = a.payload.doc.data() as MenuI;                
          const newObj = this.transformDataToMenuInterface(data)        
          return  newObj ;})));
  }

  private transformDataToMenuInterface(data: any): MenuI{
    const f1: any = data.fecha_inicio;
    const f2: any = convertTimestamp(f1);
    data.fecha_inicio = f2;
    data.fecha_inicio_str = f2.toLocaleDateString();
    return data
  }

  currentUser(): string {
    const user = localStorage.getItem('userId')    
    if (user != null ) {
       return user 
    } else {
      return 'error'
    }
  }

  addMenu(menu: MenuI): Promise<Boolean> {
    let new_id = this.afs.createId()
    menu.idMenu = new_id
    menu.fecha_inicio_str = this.get_strdate(menu.fecha_inicio)
    menu.fecha_creation = new Date()
    menu.fecha_creation_str = this.get_strdate(new Date()) 
    menu.user_creation =  this.currentUser()
    return this.afs.collection<MenuI>('Menus')
      .doc(new_id)
        .set(menu)
          .then(() => { return true }
          ,error => { 
            const err = this.traductorError.traducir(error)
            throw new Error (err)
          })            
  } 

  editMenu(menu: MenuI): Promise<Boolean> {
    return this.afs.collection<MenuI>('Menus').doc(menu.idMenu)
      .update(menu).then(() => {return true}
                       ,error => {
                          const err = this.traductorError.traducir(error)
                          throw new Error (err)
                        }
      )
  }

  getMenuDetalle(idMenu: string){
    return this.afs.collectionGroup<MenuDetalleI>('MenuDetalle', 
      ref=>ref.where('idMenu','==', idMenu))
        .valueChanges().pipe(catchError(this.errorHandler))
  
/*       let id_mesa_oper = detalle.id_mesa_oper;
      let ruta_detalle = `Operaciones/${id_operacion}/Mesas_Operacion/${id_mesa_oper}/Comandas/${id_comanda}/Comanda_detalle/${id_detalle}`
      let detalle_update = this.afs.firestore.collectionGroup('Comanda_detalle').firestore.doc(ruta_detalle) */
  }

  async guardarFotoUrl(idMenu: string, urlFoto: string) {
    let batch = this.afs.firestore.batch();
    let menuRef = this.afs.firestore.collection('Menus').doc(idMenu)
    batch.update(menuRef, {foto:urlFoto})
    await batch.commit().then(()=>{return true}, (error)=>{
      const err = this.traductorError.traducir(error)
      throw new Error (err)      
    })
  }

  private get_strdate(fecha: Date): string {
    let a: Date = fecha;
    let strdate: string = 'seconds:' + (a.getTime()/1000).toString() + ', nanosecons: 0';    
    return strdate;
  }


  private errorHandler(error: FbErrorI) {
    let trans = new TraducirErrores();
    let errorMsg = trans.traducir(error);
    return throwError(()=>new Error(errorMsg));      
  }
}

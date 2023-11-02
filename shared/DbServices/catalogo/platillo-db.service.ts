import { Injectable } from '@angular/core';
//firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';
//rxjs
import { catchError, Observable, throwError, take } from 'rxjs';
import { map } from 'rxjs/operators';
//model &interface
import { PlatilloI } from '../../model/catalogos/platillo';
import { CategoriaPlatilloI } from '../../model/catalogos/categoria-platillo';
//utils
import { FbErrorI } from '../../model/utilidad/fb-error';
import { TraducirErrores } from '../../utilidades/traducirError';
import { convertTimestamp } from 'convert-firebase-timestamp';

@Injectable({
  providedIn: 'root'
})
export class PlatilloDbService {
  private traductorError = new TraducirErrores();

  constructor(private afs: AngularFirestore) {}

  getPlatillo(id_platillo: string): Observable<PlatilloI[]>{
    return this.afs.collection<PlatilloI>('Platillos',ref =>
      ref.where('id_platillo', '==', id_platillo)).valueChanges()
        .pipe( catchError(this.errorHandler), take(1))

  }

  getPlatillos(): Observable<PlatilloI[]>{
    return this.afs.collection<PlatilloI>('Platillos').snapshotChanges().pipe(
      catchError(this.errorHandler),
      map( actions => 
        actions.map(a => { 
          const data = a.payload.doc.data() as PlatilloI;                
          const newObj = this.transformDataToPlatilloInterface(data)
          return  newObj ;})));
  }

  private transformDataToPlatilloInterface(data: any): PlatilloI{
    const f1: any = data.fecha_alta
    const f2: any = convertTimestamp(f1);
    data.fechaNacimiento = f2;
    data.fechaNacStr = f2.toLocaleDateString();  
    return data
  }

  private errorHandler(error: FbErrorI) {
    let trans = new TraducirErrores();
    let errorMsg = trans.traducir(error);
    return throwError(()=>new Error(errorMsg));      
  }

  addPlatillo(platillo: PlatilloI): Promise<Boolean> {
    let new_id = this.afs.createId()
    platillo.idPlatillo = new_id
    return this.afs.collection<PlatilloI>('Platillos')
      .doc(new_id)
        .set(platillo)
          .then(() => { return true }
          ,error => { 
            const err = this.traductorError.traducir(error)
            throw new Error (err)
          })            
  } 

  editPlatillo(platillo: PlatilloI): Promise<Boolean> {
    return this.afs.collection<PlatilloI>('Platillos').doc(platillo.idPlatillo)
      .update(platillo).then(() => {return true}
                       ,error => {
                          const err = this.traductorError.traducir(error)
                          throw new Error (err)
                        }
      )
  }

  async guardarFotoUrl(idPlatillo: string, urlFoto: string) {
    let batch = this.afs.firestore.batch();
    let platilloRef = this.afs.firestore.collection('Platillos').doc(idPlatillo)
    batch.update(platilloRef, {imagen:urlFoto})
    await batch.commit().then(()=>{return true}, (error)=>{
      const err = this.traductorError.traducir(error)
      throw new Error (err)      
    })
  }


}

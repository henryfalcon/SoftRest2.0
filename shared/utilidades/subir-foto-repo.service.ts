import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { FileI } from '../utilidades/file-i';
import { last, switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
//utils
import { TraducirErrores } from '../utilidades/traducirError';
import { FbErrorI } from '../model/utilidad/fb-error';

@Injectable({
  providedIn: 'root'
})
export class SubirFotoRepoService {
  public filePath: string = '';
  public downloadUrl: string = '';

  constructor(private afsStorage: AngularFireStorage) { }

  uploadFoto(fileName: string, picture: FileI) {
    this.filePath = `Repositorio-Imagenes/${fileName}`;    
    const fileRef = this.afsStorage.ref(this.filePath);
    const task = this.afsStorage.upload(this.filePath, picture);
    return task.snapshotChanges().pipe(
      catchError(this.errorHandler),
      last(),
      switchMap(() => fileRef.getDownloadURL()))
  }

  private errorHandler(error: FbErrorI) {
    let trans = new TraducirErrores();
    let errorMsg = trans.traducir(error);
    return throwError(() => new Error(errorMsg));
  }
}

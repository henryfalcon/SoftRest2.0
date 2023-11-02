import { Injectable } from '@angular/core';
//rxjs
import { throwError } from 'rxjs';
//angular fire auth
import { AngularFireAuth } from '@angular/fire/compat/auth';
//interface
import { UsuarioI } from '../../shared/model/catalogos/usuario';
//utils
import { FbErrorI } from '../../shared/model/utilidad/fb-error';
import { TraducirErrores } from '../../shared/utilidades/traducirError';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private transErr = new TraducirErrores();

  constructor(private afAuth: AngularFireAuth) { }

  async login(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password)
    .then((data) => {          
      if (data.user?.emailVerified) {
        return true
      } else {        
        const err = '2343'
        throw new Error(err)
      }      
    }, error  => {
      const err = this.transErr.traducir(error)
      throw new Error(err);
    })
  }

  async logout() {
    await this.afAuth.signOut()
    .then(() => { 
        return true;      
      },
      error => {
        const err = this.transErr.traducir(error);
        throw new Error(err);
      });
  } 

  public async register(email: string, password: string) {
    return await this.afAuth.createUserWithEmailAndPassword(email, password)
    .then ((user) => { 
      user.user?.sendEmailVerification()
      return true },
      error => {
        const err = this.transErr.traducir(error)
        throw new Error(err);        
      }
    )
  }

  private errorHandler(error: FbErrorI) {
    let trans = new TraducirErrores();
    let errorMsg = trans.traducir(error);
    return throwError(()=>new Error(errorMsg));      
  }

}

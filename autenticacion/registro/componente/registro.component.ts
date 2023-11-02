import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//rxjs
import { take } from 'rxjs';
//auth service
import { AutenticacionService } from '../../service/autenticacion.service';
//utils
import { IsLoadingService } from '@service-work/is-loading';
import { LayoutComService } from 'src/app/home/services/layout-com.service';
//material
import { MatSnackBar } from "@angular/material/snack-bar";
//Dialog 
import { ConfirmDialogComponent } from 'src/app/shared/componentes/confirm-dialog/componente/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form1: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  form2: FormGroup = new FormGroup({
    repetir_username: new FormControl('', [Validators.email, Validators.required]),
    repetir_password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  form3: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required])
  });

  constructor( private auth_svc: AutenticacionService, 
               private router: Router,
               private isLoadingSvc: IsLoadingService,
               private snackBar: MatSnackBar,
               private layouSvc: LayoutComService,
               private dialog: MatDialog,
               private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {    
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const mensajeRegistro = `Antes de registrarse considere lo siguiente: 
      Proporcione un correo electronico válido, el cual será su usuario.
      La contraseña no debe ser la misma que usa en su correo electronico proporcionado. 
      Si tiene dudas al respecto pregunte con el administrador de sistemas. Gracias por su atencion`
      this.mostrarMensaje(mensajeRegistro) 
    }, 1000);
  }

  mostrarMensaje(mensaje: string) {
    const dialogconfirm = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Mensaje Importante',
        message: mensaje,
        confirmText: 'Ok',        
        isErrorMsg: false
      }
    });
    dialogconfirm.afterClosed().pipe(take(1)).subscribe();
  }

  isLoading(key_loading: string): boolean {
    return this.isLoadingSvc.isLoading({key: key_loading});
  }

  ValidarRegistro(usuario:string, usuarioVerif:string, password:string, passwordVerif: string): boolean{
    let validar: boolean = false;

    if (usuario.trim() !== usuarioVerif.trim()){
      this.mostrarMensaje("El correo no coincide") }
    else {
      if (password.trim() !== passwordVerif.trim()) {
        this.mostrarMensaje("La contraseña no coincide") 
      } 
      else {
        validar = true
      }
    }
    return true;
  }

  Registrar() {
    const usuario: string = this.form1.controls['username'].value
    const usuarioVerif: string = this.form2.controls['repetir_username'].value
    const password: string = this.form1.controls['password'].value
    const passwordVerif: string = this.form2.controls['repetir_password'].value            

    if (this.ValidarRegistro(usuario, usuarioVerif, password, passwordVerif)){
      const registering = this.auth_svc.register(usuario,password)
      this.isLoadingSvc.add(registering,{key:'registering'})
      registering
        .then(()=>{
          const mensaje = `Usuario Registrado. 
          Ingrese a su correo electronico para finalizar el proceso. 
          Posterimente contacte con el Administrador del Sistema.`          
          this.mostrarMensaje(mensaje)
          this.router.navigate(['/Login'])
        }, error => {
            this.mostrarMensaje(error) 
        })
    }
  }
}


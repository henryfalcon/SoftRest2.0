import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(private auth_svc: AutenticacionService,
    private router: Router,
    private isLoadingSvc: IsLoadingService,
    private snackBar: MatSnackBar,
    private layouSvc: LayoutComService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  catchErrorHandler(error: string) { 
    if (error == 'Error: 2343') {
      this.mostrarMensaje("El usuario no esta verificado. Debe entrar en su correo y electronico y localizar el email con remitente SophiRest")
    } 
    else {
      this.snackBar.open(error, "", { duration: 5000, horizontalPosition: "right", verticalPosition: "top" })
    }
    this.layouSvc.usuarioLogin = false
  }

  submit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
       const authenticating = this.auth_svc.login(username, password);
      this.isLoadingSvc.add(authenticating, { key: "loading" });
      authenticating
        .then(() => {
          this.snackBar.open("!Acceso correcto!", "", { duration: 3000, horizontalPosition: "right", verticalPosition: "top" })
          this.layouSvc.usuarioLogin = true;
          this.router.navigate(['/dashboard'])
        }, error => this.catchErrorHandler(error)) 

      //this.layouSvc.usuarioLogin = true;
      //this.router.navigate(['/empleados/lista'])
    }
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
    return this.isLoadingSvc.isLoading({ key: key_loading });
  }
}

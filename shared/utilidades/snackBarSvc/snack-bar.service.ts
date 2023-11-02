import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar"; 

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  config: MatSnackBarConfig = {
    duration:3000,
    horizontalPosition:'right',
    verticalPosition: 'top'
  }

  constructor(public snackBar: MatSnackBar) { }

  succes(msg:string){
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '¡Atención!',this.config);
  }
}

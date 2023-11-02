import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//route
import { RegistroRoutingModule } from './registro-routing.module';
//component
import { RegistroComponent } from './componente/registro.component';
//material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule  } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
//utils
import { SpinnerModule } from 'src/app/shared/componentes/spinner/spinner.module';
//confirm dialog
import { ConfirmDialogModule } from '../../shared/componentes/confirm-dialog/confirm-dialog.module';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [  
    RegistroComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistroRoutingModule,
    ConfirmDialogModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SpinnerModule,
    MatStepperModule
  ]
})
export class RegistroModule { }

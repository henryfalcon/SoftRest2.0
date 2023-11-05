import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//route
import { EmpleadosRoutingModule } from './empleados-routing.module';
//components
import { IndexComponent } from './index/index.component';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { UploadPhotoSectionComponent } from 'src/app/shared/componentes/upload-photo-section/upload-photo-section.component';
import { TableComponent } from '../../shared/componentes/table/table.component';
import { FormEmpleadoComponent } from './form-empleado/form-empleado.component';
//utils
import { SpinnerModule } from 'src/app/shared/componentes/spinner/spinner.module';
//confirm dialog
import { ConfirmDialogModule } from '../../shared/componentes/confirm-dialog/confirm-dialog.module';
//material
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [  
    ListaEmpleadosComponent, 
    IndexComponent, 
    FormEmpleadoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //routing
    EmpleadosRoutingModule,  
    //utils
    ConfirmDialogModule,
    SpinnerModule,
    UploadPhotoSectionComponent,
    TableComponent,
    //material
    MatFormFieldModule,  
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatInputModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatExpansionModule, 
    MatCardModule
  ]
})
export class EmpleadosModule { }

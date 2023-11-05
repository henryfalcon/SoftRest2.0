import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//route
import { PlatillosRoutingModule } from './platillos-routing.module';
//confirm dialog
import { ConfirmDialogModule } from '../../shared/componentes/confirm-dialog/confirm-dialog.module';
//components
import { IndexComponent } from './index/index.component';
import { UploadPhotoSectionComponent } from 'src/app/shared/componentes/upload-photo-section/upload-photo-section.component';
import { ListaPlatillosComponent } from './lista-platillos/lista-platillos.component';
import { TableComponent } from '../../shared/componentes/table/table.component';
import { FormPlatilloComponent } from './form-platillo/form-platillo.component';
//utils
import { SpinnerModule } from 'src/app/shared/componentes/spinner/spinner.module';
//material
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    IndexComponent,
    FormPlatilloComponent,
    ListaPlatillosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //routing
    PlatillosRoutingModule,
    //utils
    ConfirmDialogModule,
    TableComponent,
    SpinnerModule,
    UploadPhotoSectionComponent,
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
    MatCardModule,
  ]
})
export class PlatillosModule { }

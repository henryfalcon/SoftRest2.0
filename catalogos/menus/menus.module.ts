import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//route
import { MenusRoutingModule } from './menus-routing.module';
//components
import { ListaMenusComponent } from './lista-menus/lista-menus.component';
import { IndexComponent } from './index/index.component';
//utils
import { SpinnerModule } from 'src/app/shared/componentes/spinner/spinner.module';
import { TableComponent } from 'src/app/shared/componentes/table/table.component';
//confirm dialog
import { ConfirmDialogModule } from '../../shared/componentes/confirm-dialog/confirm-dialog.module';
import { FormMenuComponent } from './form-menu/form-menu.component';
//material
import { MatButtonModule } from '@angular/material/button';
import { UploadPhotoSectionComponent } from 'src/app/shared/componentes/upload-photo-section/upload-photo-section.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { FormMenuDetalleComponent } from './form-menu/form-menu-detalle/form-menu-detalle.component';

@NgModule({
  declarations: [
    ListaMenusComponent,
    IndexComponent,
    FormMenuComponent,
    FormMenuDetalleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenusRoutingModule,
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
export class MenusModule { }

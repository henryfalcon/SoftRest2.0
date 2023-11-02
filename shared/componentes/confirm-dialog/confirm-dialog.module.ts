import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './componente/confirm-dialog.component';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,    
    MatDialogModule,
    MatButtonModule
  ],
  exports: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent]
})

export class ConfirmDialogModule { }

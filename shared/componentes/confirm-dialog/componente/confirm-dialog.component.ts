
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface OptionsMessageI {
  title: string,
  message: string,
  confirmText?: string,
  cancelText?: string,
  isErrorMsg?: boolean,
  isYesNoDialog?: boolean
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})

export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:OptionsMessageI){}

    cancelClick(){
      if (this.data.isYesNoDialog){
        this.dialogRef.close(false)
      } else {
        this.dialogRef.close();
      }      
    }

    confirmClick(){
      if (this.data.isYesNoDialog){
        this.dialogRef.close(true)
      } else {
        this.dialogRef.close();
      }      
    }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//component
import { SpinnerComponent } from './spinner.component';


@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports:[SpinnerComponent]
})
export class SpinnerModule { }

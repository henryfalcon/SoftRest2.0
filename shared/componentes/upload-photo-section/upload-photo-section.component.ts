import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//rxjs
import { take } from 'rxjs';
//services
import { SubirFotoRepoService } from '../../utilidades/subir-foto-repo.service';
//modules
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';
import { SpinnerModule } from '../spinner/spinner.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
//confirm-dialog
import { ConfirmDialogComponent } from '../../../shared/componentes/confirm-dialog/componente/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
//utils
import { IsLoadingService } from '@service-work/is-loading';
import { SnackBarService } from '../../../shared/utilidades/snackBarSvc/snack-bar.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-photo-section',
  templateUrl: './upload-photo-section.component.html',
  styleUrls: ['./upload-photo-section.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ConfirmDialogModule,
    SpinnerModule,
    MatButtonModule,
    MatCardModule  
  ]
})
export class UploadPhotoSectionComponent implements OnInit {
  standarId = ''
  imagesrc: any  

  fotografia_selected: any = undefined;
  subIsUploadingPhoto: boolean = false;

  @Output() fotoUrlUploaded = new EventEmitter<string>;

  @Input() set idElemento(id: string) {    
    this.standarId = id
  }

  @Input() set imageSrc(image: any) {    
    this.imagesrc = image
  }
  
  constructor(   
    private loadSvc: IsLoadingService,
    private snackBarMsg: SnackBarService,
    private dialog: MatDialog,
    private subirFotoSvc: SubirFotoRepoService,
  ) { }

  selectFile(event:any):void {    
    if (event.target.files && event.target.files[0]) {
      this.fotografia_selected = event.target.files[0];    
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }    

  GuardarFotoBucket() {
    let filename = this.componerNombreFoto()
    const uploadingFoto = this.subirFotoSvc.uploadFoto(filename, this.fotografia_selected)
    this.loadSvc.add(uploadingFoto, {key:'uploadingFoto'})
    uploadingFoto.subscribe(
      {next: (resp) => {
        if (resp) {
          this.fotoUrlUploaded.emit(resp)
          this.fotografia_selected = ''
        }
        else {
          this.snackBarMsg.succes("No se guardo la imagen. Intente de nuevo")
        }        
      }, error: (error) => { this.mostrarErrorMensaje(error) }}
    )
  }
  
 
  ngOnInit(): void {
  }

  ValidarGuardarFoto(){
    if (this.imageSrc != '') {      
      this.mostrarModalSiNo('¿Desea guardar esta imagen?').subscribe(
        { next: resp => {
          if (resp == true) {
            this.GuardarFotoBucket()
          }
        }}
      )
     }
    else {
      this.snackBarMsg.succes('No selecciono el archivo de imagen')
    }
  }
  
  private componerNombreFoto():string{
    const s = this.fotografia_selected.name;
    let id = this.standarId
    const new_name = s.substring(0, s.lastIndexOf(".")) + id + s.substring(s.lastIndexOf("."));
    return new_name;
  }

  mostrarModalSiNo(pregunta: string, labelbutton1?: string, labelbutton2?: string) {
    const dialogconfirm = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirme',
        message: pregunta,
        confirmText: (labelbutton1 != undefined ? labelbutton1 : 'Si'),
        cancelText: (labelbutton2 != undefined ? labelbutton2 : 'No'),
        isYesNoDialog: true
      }
    }).afterClosed().pipe(take(1))
    return dialogconfirm
  }
  
  isLoading(key_loading: string): boolean {
    return this.loadSvc.isLoading({ key: key_loading })
  }

  mostrarErrorMensaje(mensaje: string) {
    const dialogconfirm = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Se produjo lo siguiente:',
        message: mensaje,
        confirmText: 'Ok',
        cancelText: 'Cancelar',
        isErrorMsg: true
      }
    });
    dialogconfirm.afterClosed().pipe(take(1)).subscribe();
  }
}

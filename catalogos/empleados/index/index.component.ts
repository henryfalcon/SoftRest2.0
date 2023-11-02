import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//utility
import { LayoutComService } from '../../../home/services/layout-com.service';
//rxjs
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {  
  buttonRegisterSub!: Subscription 
  butonListRegistersSub!: Subscription
  
  constructor( private router: Router, 
               private layoutCom:LayoutComService) { }

  ngOnInit(): void {
    //
  }

  subToBotonListar() {    
    this.layoutCom.mostrarBotonesAltaListar(true)
    this.buttonRegisterSub = this.layoutCom.buttonNuevoRegistroClicked$
    .subscribe({next: (clicked) => { 
      if (clicked) {
        console.log('Navigate to Alta')
        this.router.navigate(['empleados/formulario/Alta'])
      }
    }})
  }

  subToBotonRegistrar() {
    this.butonListRegistersSub = this.layoutCom.buttonListarRegistrosClicked$
    .subscribe({next: (clicked) => {
      if (clicked) {
        this.router.navigate(['/empleados/lista'])
      }
    }})   
  }

  ngAfterViewInit(): void {
    this.subToBotonListar()
    this.subToBotonRegistrar();
  }

  ngOnDestroy(): void {
    this.buttonRegisterSub.unsubscribe()
    this.butonListRegistersSub.unsubscribe()
  }
}

import { Component, OnInit } from '@angular/core';
import { SlideInterface } from '../../../../../shared/componentes/slider/slide-interface';

@Component({
  selector: 'app-tarjeta1',
  templateUrl: './tarjeta1.component.html',
  styleUrls: ['./tarjeta1.component.css']
})
export class Tarjeta1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  slides: SlideInterface[] = [
    { url: '/assets/coctelDeCamaron.jpeg', title: 'coctelcamaron' },
    { url: '/assets/pulpoDiabla.jpg', title: 'pulpoaladiabla' },
    { url: '/assets/mojarraFrita.jpeg', title: 'mojarrafrita' },
    { url: '/assets/camaronesMojo.jpeg', title: 'camaronesmojo' }
  ];


}

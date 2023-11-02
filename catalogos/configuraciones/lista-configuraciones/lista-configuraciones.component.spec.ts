import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConfiguracionesComponent } from './lista-configuraciones.component';

describe('ListaConfiguracionesComponent', () => {
  let component: ListaConfiguracionesComponent;
  let fixture: ComponentFixture<ListaConfiguracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaConfiguracionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaConfiguracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

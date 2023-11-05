import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMenuDetalleComponent } from './form-menu-detalle.component';

describe('FormMenuDetalleComponent', () => {
  let component: FormMenuDetalleComponent;
  let fixture: ComponentFixture<FormMenuDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMenuDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMenuDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

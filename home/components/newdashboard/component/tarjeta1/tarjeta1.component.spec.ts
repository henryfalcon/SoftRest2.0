import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tarjeta1Component } from './tarjeta1.component';

describe('Tarjeta1Component', () => {
  let component: Tarjeta1Component;
  let fixture: ComponentFixture<Tarjeta1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tarjeta1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tarjeta1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

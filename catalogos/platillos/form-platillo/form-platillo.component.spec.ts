import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlatilloComponent } from './form-platillo.component';

describe('FormPlatilloComponent', () => {
  let component: FormPlatilloComponent;
  let fixture: ComponentFixture<FormPlatilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPlatilloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPlatilloComponent } from './alta-platillo.component';

describe('AltaPlatilloComponent', () => {
  let component: AltaPlatilloComponent;
  let fixture: ComponentFixture<AltaPlatilloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaPlatilloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaPlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

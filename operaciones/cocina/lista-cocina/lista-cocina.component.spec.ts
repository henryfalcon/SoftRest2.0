import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCocinaComponent } from './lista-cocina.component';

describe('ListaCocinaComponent', () => {
  let component: ListaCocinaComponent;
  let fixture: ComponentFixture<ListaCocinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCocinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCocinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

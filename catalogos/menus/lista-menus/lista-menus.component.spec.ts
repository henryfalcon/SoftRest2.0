import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMenusComponent } from './lista-menus.component';

describe('ListaMenusComponent', () => {
  let component: ListaMenusComponent;
  let fixture: ComponentFixture<ListaMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

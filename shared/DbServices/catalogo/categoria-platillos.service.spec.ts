import { TestBed } from '@angular/core/testing';

import { CategoriaPlatillosDbService } from './categoria-platillos.service';

describe('CategoriaAlimentosService', () => {
  let service: CategoriaPlatillosDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaPlatillosDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

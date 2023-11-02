import { TestBed } from '@angular/core/testing';

import { UsuariosDbService } from './usuarios-db.service';

describe('UsuariosDbService', () => {
  let service: UsuariosDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

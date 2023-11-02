import { TestBed } from '@angular/core/testing';

import { IniciarOperacionDbService } from './iniciar-operacion-db.service';

describe('IniciarOperacionDbService', () => {
  let service: IniciarOperacionDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IniciarOperacionDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

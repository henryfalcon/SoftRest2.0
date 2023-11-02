import { TestBed } from '@angular/core/testing';

import { PuestoDbService } from './puesto-db.service';

describe('PuestoDbService', () => {
  let service: PuestoDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuestoDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

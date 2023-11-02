import { TestBed } from '@angular/core/testing';

import { CajaDbService } from './caja-db.service';

describe('CajaDbService', () => {
  let service: CajaDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CajaDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

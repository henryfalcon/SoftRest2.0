import { TestBed } from '@angular/core/testing';

import { ComandasDbService } from './comandas-db.service';

describe('ComandasDbService', () => {
  let service: ComandasDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComandasDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

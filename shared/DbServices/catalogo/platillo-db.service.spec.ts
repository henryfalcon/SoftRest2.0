import { TestBed } from '@angular/core/testing';

import { PlatilloDbService } from './platillo-db.service';

describe('PlatilloDbService', () => {
  let service: PlatilloDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatilloDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

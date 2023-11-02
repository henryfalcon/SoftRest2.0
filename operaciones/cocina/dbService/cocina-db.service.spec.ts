import { TestBed } from '@angular/core/testing';

import { CocinaDbService } from './cocina-db.service';

describe('CocinaDbService', () => {
  let service: CocinaDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocinaDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

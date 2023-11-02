import { TestBed } from '@angular/core/testing';

import { ConfiguracionDbService } from './configuracion-db.service';

describe('ConfiguracionDbService', () => {
  let service: ConfiguracionDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracionDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

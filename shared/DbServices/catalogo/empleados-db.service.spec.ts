import { TestBed } from '@angular/core/testing';

import { EmpleadosDbService } from './empleados-db.service';

describe('EmpleadosDbService', () => {
  let service: EmpleadosDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadosDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

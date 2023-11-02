import { TestBed } from '@angular/core/testing';

import { SubirFotoRepoService } from './subir-foto-repo.service';

describe('SubirFotoRepoService', () => {
  let service: SubirFotoRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirFotoRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

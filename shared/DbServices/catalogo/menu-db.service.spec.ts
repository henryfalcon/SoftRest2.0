import { TestBed } from '@angular/core/testing';

import { MenuDbService } from './menu-db.service';

describe('MenuDbService', () => {
  let service: MenuDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

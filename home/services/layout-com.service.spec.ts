import { TestBed } from '@angular/core/testing';

import { LayoutComService } from './layout-com.service';

describe('LayoutComService', () => {
  let service: LayoutComService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutComService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

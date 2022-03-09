import { TestBed } from '@angular/core/testing';

import { EchallanService } from './echallan.service';

describe('EchallanService', () => {
  let service: EchallanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EchallanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

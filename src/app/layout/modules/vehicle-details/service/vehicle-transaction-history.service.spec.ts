import { TestBed } from '@angular/core/testing';

import { VehicleTransactionHistoryService } from './vehicle-transaction-history.service';

describe('VehicleTransactionHistoryService', () => {
  let service: VehicleTransactionHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleTransactionHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

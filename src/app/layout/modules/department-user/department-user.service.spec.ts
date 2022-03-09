import { TestBed } from '@angular/core/testing';

import { DepartmentUserService } from './department-user.service';

describe('DepartmentUserService', () => {
  let service: DepartmentUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

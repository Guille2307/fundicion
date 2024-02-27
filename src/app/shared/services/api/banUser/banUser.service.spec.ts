import { TestBed } from '@angular/core/testing';

import { BanUserService } from './banUser.service';

describe('BanUserService', () => {
  let service: BanUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

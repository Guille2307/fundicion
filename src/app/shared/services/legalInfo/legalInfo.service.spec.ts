import { TestBed } from '@angular/core/testing';

import { LegalInfoService } from './legalInfo.service';

describe('LegalInfoService', () => {
  let service: LegalInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

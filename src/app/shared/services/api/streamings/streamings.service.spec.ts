import { TestBed } from '@angular/core/testing';

import { StreamingsService } from './streamings.service';

describe('StreamingsService', () => {
  let service: StreamingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

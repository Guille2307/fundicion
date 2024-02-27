import { TestBed } from '@angular/core/testing';

import { SendImageService } from './sendImage.service';

describe('SendImageService', () => {
  let service: SendImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

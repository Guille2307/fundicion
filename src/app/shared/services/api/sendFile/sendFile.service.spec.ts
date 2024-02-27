import { TestBed } from '@angular/core/testing';

import { SendFileService } from './sendFile.service';

describe('SendFileService', () => {
  let service: SendFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

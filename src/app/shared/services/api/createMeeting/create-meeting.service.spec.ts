import { TestBed } from '@angular/core/testing';

import { CreateMeetingService } from './createMeeting.service';

describe('CreateMeetingService', () => {
  let service: CreateMeetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateMeetingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

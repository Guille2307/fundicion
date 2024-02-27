import { TestBed } from '@angular/core/testing';

import { ScheduleUserService } from './scheduleUser.service';

describe('ScheduleUserService', () => {
  let service: ScheduleUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

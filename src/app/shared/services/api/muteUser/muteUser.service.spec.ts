import { TestBed } from '@angular/core/testing';

import { MuteUserService } from './muteUser.service';

describe('MuteUserService', () => {
  let service: MuteUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuteUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

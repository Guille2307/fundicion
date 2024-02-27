import { TestBed } from '@angular/core/testing';

import { ShowProfileUserService } from './showProfileUser.service';

describe('ShowProfileUserService', () => {
  let service: ShowProfileUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowProfileUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

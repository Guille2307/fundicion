import { TestBed } from '@angular/core/testing';

import { UserLoggedGuard } from './userLogged.guard';

describe('UserLoggedGuard', () => {
  let guard: UserLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

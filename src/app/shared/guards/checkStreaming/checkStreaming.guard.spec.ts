import { TestBed } from '@angular/core/testing';

import { CheckStreamingGuard } from './checkStreaming.guard';

describe('CheckStreamingGuard', () => {
  let guard: CheckStreamingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckStreamingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

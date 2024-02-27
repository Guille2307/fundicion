import { TestBed } from '@angular/core/testing';

import { EditProfileUserService } from './editProfileUser.service';

describe('DataEditProfileService', () => {
  let service: EditProfileUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditProfileUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

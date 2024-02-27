import { TestBed } from '@angular/core/testing';

import { ImagesGalleryService } from './imagesGallery.service';

describe('ImagesGalleryService', () => {
  let service: ImagesGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

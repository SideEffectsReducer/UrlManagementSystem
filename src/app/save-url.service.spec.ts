import { TestBed } from '@angular/core/testing';

import { SaveUrlService } from './save-url.service';

describe('SaveUrlService', () => {
  let service: SaveUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

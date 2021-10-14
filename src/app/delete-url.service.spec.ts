import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DeleteUrlService } from './delete-url.service';

describe('DeleteUrlService', () => {
  let service: DeleteUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeleteUrlService]
      
    })
    service = TestBed.inject(DeleteUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

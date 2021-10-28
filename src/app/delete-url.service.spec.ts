import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DeleteUrlService } from './delete-url.service';

describe('DeleteUrlService', () => {
  let service: DeleteUrlService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeleteUrlService]
      
    })
    service = TestBed.inject(DeleteUrlService);
    controller = TestBed.inject(HttpTestingController);
  });


  it('should request the http server to delete url record', async () => {
    // arange
    const urlNumber = 1;
    const expectedBody = {'id': urlNumber};

    // act
    let promiseResult = service.deleteRecord(urlNumber).toPromise();

    // assert
    const mockRequest = controller.expectOne('http://localhost:3000/api/urlMgr/delete');
    mockRequest.flush(JSON.stringify(" "));  // do not delete it
    let result = await promiseResult; 
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

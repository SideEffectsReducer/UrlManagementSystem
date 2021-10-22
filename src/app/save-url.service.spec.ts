import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { SaveUrlService } from './save-url.service';
import {UrlModel} from './shared/models/url.model';

describe('SaveUrlService', () => {
  let service: SaveUrlService;
  let controller: HttpTestingController;

  function createComponent(){
    TestBed.configureTestingModule({
    // provide the component-under-test and dependent service
    imports: [HttpClientTestingModule],
    providers: [SaveUrlService]
  });
  }
  
  beforeEach(() => {
      createComponent();
      // inject both the component and the dependent service.
      service = TestBed.inject(SaveUrlService);
      controller = TestBed.inject(HttpTestingController);
  });


  it('should save url to the via post request to the server', () => {
    // arrange
    const expectedUrlObject: UrlModel =
    {
      '_id': 0,
      'title': 'Mock title',
      'tagName': 'Mock tag',
      'url': 'Mock url',
      'urlLocation': 'Mock url location',
      'active': true,
      'type': 'Mock type',
      'pdfLocation': 'Mock pdf location',
      'pdfStored': true,
      'urlTracked': true,
    };
    //act
    service.save(expectedUrlObject);
    // assert
    //Get a mock request for the URL
    const mockRequest = controller.expectOne("http://localhost:3000/api/example/add");
    expect(mockRequest.request.body).toEqual(expectedUrlObject);
  });
});

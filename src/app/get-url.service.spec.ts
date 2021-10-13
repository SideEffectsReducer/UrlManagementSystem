import {TestBed} from '@angular/core/testing';
import {GetUrlService} from './get-url.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UrlModel} from './shared/models/url.model';

describe('GetUrlService', () => {
  let service: GetUrlService;
  let controller: HttpTestingController;

  function createComponent() {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      imports: [HttpClientTestingModule],
      providers: [GetUrlService],
    });
  }

const expectedUrlObject: UrlModel =
    {
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

  beforeEach(() => {
    createComponent();
    service = TestBed.inject(GetUrlService);
    controller = TestBed.inject(HttpTestingController);
  });

  it("/list endpoint data should be recieved as a list of url records", async () => {
    //arrange
    //act
    const promiseResult = service.getAll().toPromise();

    //assert
    //Get a mock request for the URL
    const mockRequest = controller.expectOne("http://localhost:3000/api/example/list");
    //Supply mock data
    mockRequest.flush(JSON.stringify([expectedUrlObject,])); 
    const data = await promiseResult;
    const listOfUrls: Array<UrlModel> = JSON.parse(data);
    expect(listOfUrls[0]).toEqual(expectedUrlObject);
  });


  it("should send http get request and recieve one url record", async () => {
    // arrange
    const recordNum = 0;

    // act
    const promiseResult = service.getOne(recordNum).toPromise();
    // assert
    // Get a mock request for the URL
    const mockRequest = controller.expectOne('http://localhost:3000/api/example/one0');
    // Supply mock data
    mockRequest.flush(JSON.stringify(expectedUrlObject));
    const data = await promiseResult;
    const urlRecord: UrlModel = JSON.parse(data);
    expect(urlRecord).toEqual(expectedUrlObject);
  });
});

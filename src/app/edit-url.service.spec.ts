import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EditUrlService } from './edit-url.service';
import { UrlModel } from './shared/models/url.model';
import * as _ from "lodash";


describe('EditUrlService', () => {
  let service: EditUrlService;
  let controller: HttpTestingController;

  function createComponent() {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      imports: [HttpClientTestingModule],
      providers: [EditUrlService],
    });
  }

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

  beforeEach(() => {
    createComponent();
    service = TestBed.inject(EditUrlService);
    controller = TestBed.inject(HttpTestingController);
  });

  it("/edit/:number endpoint should be called when editOne function is called", () => {
    //arrange
    const modifiedUrlRecordData = _.cloneDeep(expectedUrlObject);
    modifiedUrlRecordData._id = 11;

    //act
    service.editOne(modifiedUrlRecordData);
    setTimeout(expectProperEndPointToBeCalled, 1000);

    //assert
    function expectProperEndPointToBeCalled(){
      //Get a mock request for the URL
      const mockRequest = controller.expectOne("http://localhost:3000/api/example/edit/11");
      //Supply mock data
      mockRequest.flush(JSON.stringify('')); 
    }
  });
  
}); 

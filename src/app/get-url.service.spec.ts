import { TestBed } from '@angular/core/testing';

import { GetUrlService } from './get-url.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlModel } from './shared/models/url.model';

describe('GetUrlService', () => {
  let service: GetUrlService;
  let controller: HttpTestingController;

 function createComponent(){
 
     TestBed.configureTestingModule({
       // provide the component-under-test and dependent service
       imports: [HttpClientTestingModule],
       providers: [GetUrlService]
     });
}

  beforeEach(() => {
    createComponent();
    service = TestBed.inject(GetUrlService);
    controller = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // it("/list endpoint data should be recieved as a list of url records", (done) => {
  //     //arrange
  //   //Get a mock request for the URL
  //   let mockRequest = controller.expectOne("http://localhost:3000/api/example/list");
  //   //Supply mock data
  //   mockRequest.flush(JSON.stringify(
  //     [{
  //       "title": "Mock title",
  //       "tagName": "Mock tag",
  //       "url": "Mock url",
  //       "urlLocation": "Mock url location",
  //       "active": true,
  //       "type": "Mock type",
  //       "pdfLocation": "Mock pdf location",
  //       "pdfStored": true,
  //       "urlTracked": true
  //     },
  //     ]
  //   ));

  //     //act
  //     let listOfUrls: Array<UrlModel> = service.getAll();
      

  //     //assert
  //     expect(listOfUrls[0].title).toBe("Mock title");
    
  // });




  it("should send http get request and recieve list of urls", (done) => {
    service.getObservable().subscribe((data) => {
      let listOfUrls: Array<UrlModel> = JSON.parse(data);

      expect(listOfUrls[0].title).toBe("Mock title");
      expect(listOfUrls[0].tagName).toBe("Mock tag");
      expect(listOfUrls[0].url).toBe("Mock url");

      expect(listOfUrls[0].urlLocation).toBe("Mock url location");
      expect(listOfUrls[0].active).toBe(true);
      expect(listOfUrls[0].type).toBe("Mock type");
      expect(listOfUrls[0].pdfLocation).toBe("Mock pdf location");
      expect(listOfUrls[0].pdfStored).toBe(true);
      expect(listOfUrls[0].urlTracked).toBe(true);
      done();
    });
    //Get a mock request for the URL
    let mockRequest = controller.expectOne("http://localhost:3000/api/example/list");
    //Supply mock data
    mockRequest.flush(JSON.stringify(
      [{
        "title": "Mock title",
        "tagName": "Mock tag",
        "url": "Mock url",
        "urlLocation": "Mock url location",
        "active": true,
        "type": "Mock type",
        "pdfLocation": "Mock pdf location",
        "pdfStored": true,
        "urlTracked": true
      },
      ]
    ));
  });


});

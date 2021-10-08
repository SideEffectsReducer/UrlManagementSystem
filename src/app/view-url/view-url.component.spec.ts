import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ViewUrlComponent } from './view-url.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UrlModel } from '../shared/models/url.model';
import { FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';



describe('ViewUrlComponent', () => {
  let component: ViewUrlComponent;
  let controller: HttpTestingController;
  let fixture: ComponentFixture<ViewUrlComponent>;

function createComponent(){

    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      imports: [HttpClientTestingModule, FormsModule],
      providers: [ViewUrlComponent]
    });

  fixture = TestBed.createComponent(ViewUrlComponent);
  component = fixture.componentInstance;
  controller = TestBed.inject(HttpTestingController)
}

  beforeEach(() => {

    createComponent();
  });


  it('should initalize urlModel list with default values', () => {
    let emptyUrlObject = new UrlModel();
    expect(component.urlModel).toEqual(emptyUrlObject);

    component.ngOnInit();

    let defaultUrlObject = `
  {
      "title": "aTitle",
      "tagName": "aTagName",
      "url": "aUrl",
      "urlLocation": "aUrlLocation",
      "active": true,
      "type": "aType",
      "pdfLocation": "aPdfLocation",
      "pdfStored": true,
      "urlTracked": true 
  }`;
    expect(component.urlModel).toEqual(JSON.parse(defaultUrlObject));
  });


  it('should update coresponding fields in html view', () => {
  //arrange
    let defaultUrlObject = `
  {
      "title": "aTitle",
      "tagName": "aTagName",
      "url": "aUrl",
      "urlLocation": "aUrlLocation",
      "active": true,
      "type": "aType",
      "pdfLocation": "aPdfLocation",
      "pdfStored": true,
      "urlTracked": true 
  }`;
  let urlObject= JSON.parse(defaultUrlObject);

  //act
  component.updateRecord(urlObject);
  fixture.detectChanges();

  //assert
  let root = fixture.debugElement.nativeElement;
  let input : HTMLInputElement = root.querySelector("#title");
  expect(input.value).toEqual("aTitle");
  input = root.querySelector("#tagName");
  expect(input.value).toEqual("aTagName");
  input = root.querySelector("#url");
  expect(input.value).toEqual("aUrl")

  input = root.querySelector("#urlLocation");
  expect(input.value).toEqual("aUrlLocation")

  input = root.querySelector("#pdfStored");
  expect(input.value).toEqual("true");

  input = root.querySelector("#urlTracked");
  expect(input.value).toEqual("true");
  });

  it('should emit list event upon back button click', () => {
    //arange
    component.backUrlEvent.pipe(first()).subscribe((aString: string) => 
    expect(aString).toBe("list"));

    //act
    component.notifySwitchToListPage();

    //assert

  });


  it('should recive correct viewID as an input',  (done) => {
    //assert
    component.viewId = 1;
    component.updateTable(); 
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
      {
        "title": "Mock title2",
        "tagName": "Mock tag2",
        "url": "Mock url2",
        "urlLocation": "Mock url location2",
        "active": false,
        "type": "Mock type2",
        "pdfLocation": "Mock pdf location2",
        "pdfStored": false,
        "urlTracked": false
      }
      ]
    ));

    //act
    done();

    //assert
    expect(component.urlModel.title).toBe("Mock title2");
    expect(component.urlModel.tagName).toBe("Mock tag2");
    expect(component.urlModel.url).toBe("Mock url2");

    expect(component.urlModel.urlLocation).toBe("Mock url location2");
    expect(component.urlModel.active).toBe(false);
    expect(component.urlModel.type).toBe("Mock type2");
    expect(component.urlModel.pdfLocation).toBe("Mock pdf location2");
    expect(component.urlModel.pdfStored).toBe(false);
    expect(component.urlModel.urlTracked).toBe(false);

  });

  it('should have', () => {
    expect(component).toBeTruthy();
  });


  it("should send http get request and recieve list of urls", (done) => {
    component.getUrlList().subscribe((data) => {
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

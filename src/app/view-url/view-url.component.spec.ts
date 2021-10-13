import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ViewUrlComponent} from './view-url.component';
import {UrlModel} from '../shared/models/url.model';
import {first} from 'rxjs/operators';
import {GetUrlService} from '../get-url.service';
import {HttpClientModule} from '@angular/common/http';
import {Observable, of} from 'rxjs';


describe('ViewUrlComponent', () => {
  let component: ViewUrlComponent;
  let fixture: ComponentFixture<ViewUrlComponent>;

  const expectedUrlObject =
    {
      'title': 'Mock title',
      'tagName': 'Mock tag',
      'url': 'Mock url',
      'urlLocation': 'Mock url location',
      'active': 'true',
      'type': 'Mock type',
      'pdfLocation': 'Mock pdf location',
      'pdfStored': 'true',
      'urlTracked': 'true',
    };

  const expectedUrlObject2 =
    {
      'title': 'Mock title2',
      'tagName': 'Mock tag2',
      'url': 'Mock url2',
      'urlLocation': 'Mock url location2',
      'active': false,
      'type': 'Mock type2',
      'pdfLocation': 'Mock pdf location2',
      'pdfStored': false,
      'urlTracked': false,
    };

  function createComponent() {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      imports: [HttpClientModule],
      providers: [
        ViewUrlComponent,
        {provide: GetUrlService, useClass: MockGetUrlService}
      ],
    });
  }

  class MockGetUrlService {
    getAll(): Observable<string> {
      return of(this.getMockData());
    }

    private getMockData(): string {
      return JSON.stringify([expectedUrlObject, expectedUrlObject2]);
    }

    getOne(recordNum: number): Observable<string> {
      const listOfUrlRecords: UrlModel[] = JSON.parse(this.getMockData());
      return of(JSON.stringify(listOfUrlRecords[recordNum]));
    }
  }


  function verifyHtmlNode(htmlNodeId: string, expectedValue: any){
        const root = fixture.debugElement.nativeElement;
        let input: HTMLInputElement = root.querySelector(htmlNodeId);
        expect(input.value).toEqual(expectedValue);
  }

  beforeEach(() => {
    createComponent();
    component = TestBed.inject(ViewUrlComponent);
    fixture = TestBed.createComponent(ViewUrlComponent);
  });


  it('should initalize urlModel with default values', () => {
    // arrange
    const defaultUrlObject = 
    {
      "title": "",
      "tagName": "",
      "url": "",
      "urlLocation": "",
      "active": false,
      "type": "",
      "pdfLocation": "",
      "pdfStored": false,
      "urlTracked": false 
    };
    // act
    // nothing here
    // assert
    expect(component.urlRecord).toEqual(defaultUrlObject);
  });


  it('should update coresponding fields in html view', () => {
    // arrange
    // act
    component.ngOnInit();
    setTimeout(() => checkHtml(), 1000);
    // assert
    function checkHtml() {
      fixture.detectChanges();
      verifyHtmlNode('#title', expectedUrlObject.title);
      verifyHtmlNode('#tagName', expectedUrlObject.tagName);
      verifyHtmlNode('#url', expectedUrlObject.url);
      verifyHtmlNode('#urlLocation', expectedUrlObject.urlLocation);
      verifyHtmlNode('#pdfStored', expectedUrlObject.pdfStored);
      verifyHtmlNode('#urlTracked', expectedUrlObject.urlTracked);
    }
  });


  it('should emit list event upon back button click', async() => {
    // arange
    const promiseEventValue = component.backUrlEvent.pipe(first()).toPromise();
    // act
    component.notifySwitchToListPage();
    // assert
    const eventValue = await promiseEventValue;
    expect(eventValue).toEqual('list');
  });


  it('should recive correct viewID as an input', () => {
    // arrange
    component.viewId = 1;
    // act
    component.ngOnInit();
    // assert
    expect(component.urlRecord).toEqual(expectedUrlObject2);
  });
});

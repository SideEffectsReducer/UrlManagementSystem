import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ViewUrlComponent} from './view-url.component';
import {UrlModel} from '../shared/models/url.model';
import {first} from 'rxjs/operators';
import {GetUrlService} from '../get-url.service';
import {HttpClientModule} from '@angular/common/http';
import {Observable, of} from 'rxjs';

class MockGetUrlService {
  getAll(): Observable<string> {
    return of(this.getMockData());
  }

  private getMockData(): string {
    return JSON.stringify(
        [{
          'title': 'Mock title',
          'tagName': 'Mock tag',
          'url': 'Mock url',
          'urlLocation': 'Mock url location',
          'active': true,
          'type': 'Mock type',
          'pdfLocation': 'Mock pdf location',
          'pdfStored': true,
          'urlTracked': true,
        },
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
        },
        ],
    );
  }

  getOne(recordNum: number): Observable<string> {
    const listOfUrlRecords: UrlModel[] = JSON.parse(this.getMockData());
    return of(JSON.stringify(listOfUrlRecords[recordNum]));
  }
}


describe('ViewUrlComponent', () => {
  let component: ViewUrlComponent;
  let fixture: ComponentFixture<ViewUrlComponent>;
  // let service: GetUrlService;

  function createComponent() {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      imports: [HttpClientModule],
      providers: [
        ViewUrlComponent,
        {provide: GetUrlService, useClass: MockGetUrlService}
      ],
    });


    component = TestBed.inject(ViewUrlComponent);
    // service = TestBed.inject(GetUrlService);
    fixture = TestBed.createComponent(ViewUrlComponent);
  }

  beforeEach(() => {
    createComponent();
  });


  it('should initalize urlModel list with default values', () => {
    // arrange
    const defaultUrlObject = `
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
  }`;

    // act

    // assert
    expect(component.urlModel).toEqual(JSON.parse(defaultUrlObject));
  });


  it('should update coresponding fields in html view', () => {
    // arrange
    const expectedUrlObject =
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


    // act
    component.ngOnInit();
    setTimeout(() => checkHtml(), 1000);

    // assert
    function checkHtml() {
      fixture.detectChanges();
      const root = fixture.debugElement.nativeElement;
      let input: HTMLInputElement = root.querySelector('#title');
      expect(input.value).toEqual(expectedUrlObject.title);
      input = root.querySelector('#tagName');
      expect(input.value).toEqual(expectedUrlObject.tagName);
      input = root.querySelector('#url');
      expect(input.value).toEqual(expectedUrlObject.url);

      input = root.querySelector('#urlLocation');
      expect(input.value).toEqual(expectedUrlObject.urlLocation);

      input = root.querySelector('#pdfStored');
      expect(input.value).toEqual(expectedUrlObject.pdfStored.toString());

      input = root.querySelector('#urlTracked');
      expect(input.value).toEqual(expectedUrlObject.urlTracked.toString());
    }
  });

  it('should emit list event upon back button click', () => {
    // arange
    component.backUrlEvent.pipe(first()).subscribe((aString: string) =>
      expect(aString).toBe('list'));

    // act
    component.notifySwitchToListPage();

    // assert
  });


  it('should recive correct viewID as an input', () => {
    // assert
    component.viewId = 1;
    // act
    component.ngOnInit();

    // assert
    expect(component.urlModel.title).toBe('Mock title2');
    expect(component.urlModel.tagName).toBe('Mock tag2');
    expect(component.urlModel.url).toBe('Mock url2');

    expect(component.urlModel.urlLocation).toBe('Mock url location2');
    expect(component.urlModel.active).toBe(false);
    expect(component.urlModel.type).toBe('Mock type2');
    expect(component.urlModel.pdfLocation).toBe('Mock pdf location2');
    expect(component.urlModel.pdfStored).toBe(false);
    expect(component.urlModel.urlTracked).toBe(false);
  });

  it('should have', () => {
    expect(component).toBeTruthy();
  });
});

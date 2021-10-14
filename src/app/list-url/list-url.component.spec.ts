import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ListUrlComponent } from './list-url.component';
import { GetUrlService } from '../get-url.service';
import { Observable, of } from 'rxjs';
import { UrlModel } from '../shared/models/url.model';
import { first } from 'rxjs/operators';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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



class MockSubscribable{
        subscribe(){
          console.log("subscribe");
        }

}
class MockHttpClient{
  get(){
    console.log("Mocked http get method");
    return new MockSubscribable();
  }

  delete(){
    console.log("Mocked http get method");
    return new MockSubscribable();
  }

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


describe('ListUrlComponent', () => {
  let component: ListUrlComponent;
    let httpClient: HttpClient;
  let fixture: ComponentFixture<ListUrlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUrlComponent ],
      imports: [HttpClientModule],
      providers: [
        ListUrlComponent,
        {provide: GetUrlService, useClass: MockGetUrlService},
        {provide: HttpClient, useClass: MockHttpClient}
      ]
    })
    .compileComponents();

    component = TestBed.inject(ListUrlComponent);
    httpClient = TestBed.inject(HttpClient);
    fixture = TestBed.createComponent(ListUrlComponent);
  });

 it('should emit add event upon add button click', async() => {
    // arange
    const promiseEventValue = component.addUrlEvent.pipe(first()).toPromise();
    // act
    component.notifySwitchToAddPage();
    // assert
    const eventValue = await promiseEventValue;
    expect(eventValue).toEqual('add');
});

 it('should emit view event upon view button click', async() => {
    // arange
    const promiseEventValue = component.viewUrlEvent.pipe(first()).toPromise();
    const viewNumber = 0;
    // act
    component.notifySwitchToViewPage(viewNumber);
    // assert
    const eventValue = await promiseEventValue;
    expect(eventValue).toEqual({'view':viewNumber});
});

  it('should initally update the page with list of Url', () => {
    // arrange
    // act
    component.ngOnInit();
    // assert
    expect(component.listOfUrlRecords).toHaveSize(2);
    expect(component.listOfUrlRecords[0]).toEqual(expectedUrlObject);
    expect(component.listOfUrlRecords[1]).toEqual(expectedUrlObject2);
  });


  // TO DO
  // it('should update coresponding fields in html view', () => {
  //   // arrange
  //   // act
  //   component.ngOnInit();
  //   setTimeout(() => checkHtml(), 1000);
  //   // assert
  //   function checkHtml() {
  //     fixture.detectChanges();
  //     verifyHtmlNode('#title', expectedUrlObject.title);
  //     verifyHtmlNode('#tagName', expectedUrlObject.tagName);
  //     verifyHtmlNode('#url', expectedUrlObject.url);
  //     verifyHtmlNode('#urlLocation', expectedUrlObject.urlLocation);
  //     verifyHtmlNode('#pdfStored', expectedUrlObject.pdfStored);
  //     verifyHtmlNode('#urlTracked', expectedUrlObject.urlTracked);
  //   }
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// describe('ListUrlComponent', () => {
//   let service: ListUrlComponent;
//   let controller: HttpTestingController;

//   function createComponent() {
//     TestBed.configureTestingModule({
//       // provide the component-under-test and dependent service
//       imports: [HttpClientTestingModule],
//       providers: [ListUrlComponent],
//     });
//   }

//    beforeEach(() => {
//     createComponent();
//     service = TestBed.inject(ListUrlComponent);
//     controller = TestBed.inject(HttpTestingController);
//   });


//   it('should request the http server to delete url record', (done) => {
//     // arange
//     const urlNumber = 1;

//     // act
//     service.deleteRecord(urlNumber)

//     // assert
//     controller.expectOne('http://localhost:3000/api/example/delete');
//   });



// });
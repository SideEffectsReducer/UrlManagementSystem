import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ListUrlComponent } from './list-url.component';
import { GetUrlService } from '../get-url.service';
import { Observable, of } from 'rxjs';
import { UrlModel } from '../shared/models/url.model';
import { first } from 'rxjs/operators';
import { DeleteUrlService } from '../delete-url.service';
import * as _ from "lodash";

/********************* */
// TO DO:
// - html fields are updated after init.
// - column view switching positive testing
// - html unit testing
// - equivalent class testing and corner cases
// - negative testing
// - e2e testing with protractor
/********************* */

const expectedUrlObject =
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

const expectedUrlObject2 =
{
  '_id': 0,
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


class MockDeleteUrlSevice {
  deleteRecord(idToRemove: number): Observable<any> {
    return of(0);
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
  // let fixture: ComponentFixture<ListUrlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUrlComponent],
      imports: [HttpClientModule],
      providers: [
        ListUrlComponent,
        { provide: GetUrlService, useClass: MockGetUrlService },
        { provide: DeleteUrlService, useClass: MockDeleteUrlSevice },
      ]
    })
      .compileComponents();

    component = TestBed.inject(ListUrlComponent);
    // fixture = TestBed.createComponent(ListUrlComponent);
  });

  it('should emit add event upon add button click', async () => {
    // arange
    const promiseEventValue = component.addUrlEvent.pipe(first()).toPromise();
    // act
    component.notifySwitchToAddPage();
    // assert
    const eventValue = await promiseEventValue;
    expect(eventValue).toEqual('add');
  });

  it('should emit view event upon view button click', async () => {
    // arange
    const promiseEventValue = component.viewUrlEvent.pipe(first()).toPromise();
    const viewNumber = 0;
    // act
    component.notifySwitchToViewPage(viewNumber);
    // assert
    const eventValue = await promiseEventValue;
    expect(eventValue).toEqual({ 'view': viewNumber });
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


  it('should on click select column should be placed in selectedCoulmnNames array', () => {
    // arrange
    const columnsName = ['title', 'url', 'tagName', 'urlLocation', 'active', 'type',
      'pdfStored', 'urlTracked'];
    // act
    component.onFilterColumnNameClick(columnsName[0]);
    component.onFilterColumnNameClick(columnsName[1]);
    component.onFilterColumnNameClick(columnsName[2]);

    // assert
    expect(component.selectedColumnNames).toEqual([columnsName[0], columnsName[1], columnsName[2]]);
  })

  it('should on double click select column should be not placed in selectedCoulmnNames array', () => {
    // arrange
    const columnsName = ['title', 'url', 'tagName', 'urlLocation', 'active', 'type',
      'pdfStored', 'urlTracked'];
    // act
    component.onFilterColumnNameClick(columnsName[0]);
    component.onFilterColumnNameClick(columnsName[0]);

    // assert
    expect(component.selectedColumnNames).toHaveSize(0);
  })

});



class MockBigDataGetUrlService {
  getAll(): Observable<string> {
    return of(this.getMockData());
  }

  private getMockData(): string {
    return JSON.stringify([
      expectedUrlObject2,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject,
      expectedUrlObject2,
      expectedUrlObject,
      expectedUrlObject,
    ]);
  }

  getOne(recordNum: number): Observable<string> {
    const listOfUrlRecords: UrlModel[] = JSON.parse(this.getMockData());
    return of(JSON.stringify(listOfUrlRecords[recordNum]));
  }
}


describe('ListUrlComponent huge amount of data handling', () => {
  let component: ListUrlComponent;
  const firstPage = 1;
  const secondPage = 2;
  // let fixture: ComponentFixture<ListUrlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListUrlComponent],
      imports: [HttpClientModule],
      providers: [
        ListUrlComponent,
        { provide: GetUrlService, useClass: MockBigDataGetUrlService },
        { provide: DeleteUrlService, useClass: MockDeleteUrlSevice },
      ]
    })
      .compileComponents();

    component = TestBed.inject(ListUrlComponent);
    // fixture = TestBed.createComponent(ListUrlComponent);
  });

  // page switching
  it('should display only ten url records on the first page', () => {
    // arrange
    component.ngOnInit();

    // act
    //  nothing here

    // assert
    expect(component.listOfUrlRecords).toHaveSize(10);
  });

  it('should next page click display another ten url', () => {
    // arrange
    component.ngOnInit();

    // act
    component.nextPage();

    // assert
    expect(component.listOfUrlRecords).toHaveSize(10);
  });

  it('should next page and prev page click display the same urls', () => {
    // arrange
    component.ngOnInit();
    const firstPageList = _.cloneDeep(component.listOfUrlRecords);

    // act
    component.nextPage();
    component.prevPage();

    // assert
    expect(firstPageList).toHaveSize(10);
    expect(component.listOfUrlRecords).toHaveSize(10);
    expect(component.listOfUrlRecords).toEqual(firstPageList);
  });

  it('should prev page and next page click display the same urls', () => {
    // arrange
    component.ngOnInit();
    const firstPageList = _.cloneDeep(component.listOfUrlRecords);

    // act
    component.prevPage();
    component.nextPage();

    // assert
    expect(firstPageList).toHaveSize(10);
    expect(component.listOfUrlRecords).toHaveSize(10);
    expect(component.listOfUrlRecords).toEqual(firstPageList);
  });

  it('once on first page next page click should result the same as clicking second page', () => {
    // arrange
    let firstScenarioUrlList = null;
    let secondScenarioUrlList = null;
    component.ngOnInit();

    // act
    component.nextPage();
    firstScenarioUrlList = _.cloneDeep(component.listOfUrlRecords);

    component.pageClicked(secondPage);
    secondScenarioUrlList = _.cloneDeep(component.listOfUrlRecords);

    // assert
    expect(firstScenarioUrlList).toHaveSize(10);
    expect(secondScenarioUrlList).toHaveSize(10);
    expect(firstScenarioUrlList).toEqual(secondScenarioUrlList);
  });

  it('once on second page prev page click should result same as clicking first page', () => {
    // arrange
    let firstScenarioUrlList = null;
    let secondScenarioUrlList = null;
    component.ngOnInit();
    component.pageClicked(secondPage);

    // act
    component.prevPage();
    firstScenarioUrlList = _.cloneDeep(component.listOfUrlRecords);

    component.pageClicked(firstPage);
    secondScenarioUrlList = _.cloneDeep(component.listOfUrlRecords);

    // assert
    expect(firstScenarioUrlList).toHaveSize(10);
    expect(secondScenarioUrlList).toHaveSize(10);
    expect(firstScenarioUrlList).toEqual(secondScenarioUrlList);
  });


  // searching
  it('search should check title and return only matching url records', () => {
    // arange
    component.ngOnInit();
    component.searchEntry = 'Mock title2';

    // act
    component.onSearchClicked();

    // assert
    expect(component.listOfUrlRecords).toHaveSize(2);
  });

  it('search should check tagName and return only matching url records', () => {
    // arange
    component.ngOnInit();
    component.searchEntry = 'Mock tag2';

    // act
    component.onSearchClicked();

    // assert
    expect(component.listOfUrlRecords).toHaveSize(2);
  });

  it('search should check url and return only matching url records', () => {
    // arange
    component.ngOnInit();
    component.searchEntry = 'Mock url2';

    // act
    component.onSearchClicked();

    // assert
    expect(component.listOfUrlRecords).toHaveSize(2);
  });

  it('search should check urlLocation and return only matching url records', () => {
    // arange
    component.ngOnInit();
    component.searchEntry = 'Mock url location2';

    // act
    component.onSearchClicked();

    // assert
    expect(component.listOfUrlRecords).toHaveSize(2);
  });

});
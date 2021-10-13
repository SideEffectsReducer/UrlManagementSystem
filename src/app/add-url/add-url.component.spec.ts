import {TestBed} from '@angular/core/testing';
import {SaveUrlService} from '../save-url.service';
import {AddUrlComponent} from './add-url.component';
import {first} from 'rxjs/operators';

describe('AddUrlComponent', () => {
  let component: AddUrlComponent;
  let saveUrlService: SaveUrlService;
  class MockSaveUrlService{
    save = jasmine.createSpy('save');
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
    // provide the component-under-test and dependent service
    providers: [
      AddUrlComponent,
      { provide: SaveUrlService, useClass: MockSaveUrlService }
    ]
  });

  // inject both the component and the dependent service.
  component = TestBed.inject(AddUrlComponent);
  saveUrlService = TestBed.inject(SaveUrlService);
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


  it('should change url type to external', () => {
    // arange
    const activeExternalType = true;
    // act
    component.onExternalType(activeExternalType);
    // assert
    expect(component.externalType).toEqual(activeExternalType);
    expect(component.urlRecord.type).toEqual('external');
  });


  it('should change url type to upload', () => {
    // arange
    const activeExternalType = false;
    // act
    component.onExternalType(activeExternalType);
    // assert
    expect(component.externalType).toEqual(activeExternalType);
    expect(component.urlRecord.type).toEqual('upload');
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


  it('should server recieve and save url there', () => {
    // arange
    // act
    component.onSubmit();
    // assert
    expect(saveUrlService.save).toHaveBeenCalledWith(component.urlRecord);
  });
});

import {ComponentFixture,TestBed} from '@angular/core/testing';
import {SaveUrlService} from '../save-url.service';
import {AddUrlComponent} from './add-url.component';
import {first} from 'rxjs/operators';
import {UrlModel} from '../shared/models/url.model';
import { DebugElement } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AddUrlComponent', () => {
  let component: AddUrlComponent;
  let saveUrlService: SaveUrlService;
  let fixture: ComponentFixture<AddUrlComponent>;
  class MockSaveUrlService{
    save = jasmine.createSpy('save');
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
    // provide the component-under-test and dependent service
    declarations:[AddUrlComponent],
    imports: [FormsModule, HttpClientModule],
    providers: [
      AddUrlComponent,
      { provide: SaveUrlService, useClass: MockSaveUrlService }
    ]
  });

  // inject both the component and the dependent service.

  component = TestBed.inject(AddUrlComponent);
  fixture = TestBed.createComponent(AddUrlComponent);
  saveUrlService = TestBed.inject(SaveUrlService);
  });


 it('should initalize urlModel with default values', () => {
    // arrange
    const defaultUrlObject = 
    {
      '_id': 0,
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

  // it('submitted html form should call save-url service with correct data', (done) => {
  //   // arrange
  //   const expectedUrlObject: UrlModel =
  //   {
  //     'title': 'Mock title',
  //     'tagName': 'Mock tag',
  //     'url': 'Mock url',
  //     'urlLocation': 'Mock url location',
  //     'active': true,
  //     'type': 'Mock type',
  //     'pdfLocation': 'Mock pdf location',
  //     'pdfStored': true,
  //     'urlTracked': true,
  //   };
  //   supplyHtmlTagWithContent('#title', expectedUrlObject.title.toString());
  //   supplyHtmlTagWithContent('#tagName', expectedUrlObject.tagName.toString());
  //   supplyHtmlTagWithContent('#url', expectedUrlObject.url.toString());
  //   supplyHtmlTagWithContent('#urlLocation', expectedUrlObject.urlLocation.toString());
  //   supplyHtmlTagWithContent('#pdfStored', expectedUrlObject.pdfStored.toString());
  //   supplyHtmlTagWithContent('#urlTracked', expectedUrlObject.urlTracked.toString());
  //   const root = fixture.debugElement;
  //   let addButton: DebugElement = root.query(By.css('#addButton'));

  //   // act
  //   addButton.triggerEventHandler("click", null);
  //   setTimeout(() => checkResult(), 1000);

  //   // assert
  //   fixture.detectChanges();
  //   function checkResult(){
  //   expect(saveUrlService.save).toHaveBeenCalled();
  //   done();
  //   }

  //   function supplyHtmlTagWithContent(tagId: string, content: string){
  //     const root = fixture.debugElement.nativeElement;
  //     let element: HTMLElement = root.querySelector(tagId);
  //     element.textContent = content;
  //   }
  // })

});

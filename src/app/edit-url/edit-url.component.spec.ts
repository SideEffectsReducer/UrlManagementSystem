import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUrlComponent } from './edit-url.component';
import { EditUrlService } from '../edit-url.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

/********************* */
// TO DO:
// - html unit testing
// - equivalent class testing and corner cases
// - negative testing
// - e2e testing with protractor
/********************* */

describe('EditUrlComponent', () => {
  let component: EditUrlComponent;
  let editUrlService: EditUrlService;
  let fixture: ComponentFixture<EditUrlComponent>;
  class MockEditUrlService {
    editOne = jasmine.createSpy('editOne');
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      declarations: [EditUrlComponent],
      imports: [FormsModule, HttpClientModule],
      providers: [
        EditUrlComponent,
        { provide: EditUrlService, useClass: MockEditUrlService }
      ]
    });

    // inject both the component and the dependent service.

    component = TestBed.inject(EditUrlComponent);
    fixture = TestBed.createComponent(EditUrlComponent);
    editUrlService = TestBed.inject(EditUrlService);
  });

  it('should display all field of url record when edit url record is clicked', () => {
    // arrange
    const defaultUrlRecord = {
      _id: 0,
      title: '',
      tagName: '',
      url: '',
      urlLocation: '',
      active: false,
      type: '',
      pdfLocation: '',
      pdfStored: false,
      urlTracked: false
    };
    component.ngOnInit();

    // act

    // assert
    expect(component.urlRecord).toEqual(defaultUrlRecord);
  });

  it('should call edit endpoint with new fields to be updated when save button is clicked', () => {
    // arrange
    component.ngOnInit();
    component.urlRecord = {
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

    // act
    component.onSaveButtonClick();

    // assert
    expect(editUrlService.editOne).toHaveBeenCalledWith(component.urlRecord);
  });

});

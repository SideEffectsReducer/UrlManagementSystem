import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUrlComponent } from './edit-url.component';
import {EditUrlService} from '../edit-url.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { on } from 'events';

describe('EditUrlComponent', () => {
  let component: EditUrlComponent;
  let editUrlService: EditUrlService;
  let fixture: ComponentFixture<EditUrlComponent>;
  class MockEditUrlService{
    editOne = jasmine.createSpy('editOne');
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
    // provide the component-under-test and dependent service
    declarations:[EditUrlComponent],
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

  // it('should ', () => {
  //   // arrange
  //   component.urlRecord = {
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

  //   // act
  //   component.ngOnInit();

    // assert
    expect(editUrlService.editOne).toHaveBeenCalledWith(component.urlRecord);
  });

  it('should on edit button click should call edit endpoint with new fields to be updated', () => {
    // arrange
    component.ngOnInit();
    component.urlRecord = {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

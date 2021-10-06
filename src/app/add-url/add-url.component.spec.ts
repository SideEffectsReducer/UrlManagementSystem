import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaveUrlService } from '../save-url.service';
import { AddUrlComponent } from './add-url.component';

class MockSaveUrlService{
  save(){
    console.log("Mocked save method of SaveUrlSevice");
  }
}

describe('AddUrlComponent', () => {
  let component: AddUrlComponent;
  let saveUrlService: SaveUrlService;
  let fixture: ComponentFixture<AddUrlComponent>;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

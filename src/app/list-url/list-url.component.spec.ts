import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ListUrlComponent } from './list-url.component';

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




describe('ListUrlComponent', () => {
  let component: ListUrlComponent;
    let httpClient: HttpClient;
  let fixture: ComponentFixture<ListUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUrlComponent ]
    })
    .compileComponents();
  });


 beforeEach(async () => {
      TestBed.configureTestingModule({
    // provide the component-under-test and dependent service
    providers: [
      ListUrlComponent,
      { provide: HttpClient, useClass: MockHttpClient }
    ]
  });

  // inject both the component and the dependent service.
  component = TestBed.inject(ListUrlComponent);
  httpClient = TestBed.inject(HttpClient);

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

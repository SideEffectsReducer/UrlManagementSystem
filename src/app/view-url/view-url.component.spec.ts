import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ViewUrlComponent } from './view-url.component';


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
}



describe('ViewUrlComponent', () => {
  let component: ViewUrlComponent;
  let httpClient: HttpClient
  let fixture: ComponentFixture<ViewUrlComponent>;

  beforeEach(async () => {
      TestBed.configureTestingModule({
    // provide the component-under-test and dependent service
    providers: [
      ViewUrlComponent,
      { provide: HttpClient, useClass: MockHttpClient }
    ]
  });

  // inject both the component and the dependent service.
  component = TestBed.inject(ViewUrlComponent);
  httpClient = TestBed.inject(HttpClient);

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

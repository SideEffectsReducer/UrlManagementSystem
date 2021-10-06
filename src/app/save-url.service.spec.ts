import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { SaveUrlService } from './save-url.service';

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

  post(){
    console.log("Mocked http post method");
    return new MockSubscribable();
  }
}



describe('SaveUrlService', () => {
  let service: SaveUrlService;
  let httpClient: HttpClient;

    beforeEach(async () => {
      TestBed.configureTestingModule({
    // provide the component-under-test and dependent service
    providers: [
      SaveUrlService,
      { provide: HttpClient, useClass: MockHttpClient }
    ]
  });

  // inject both the component and the dependent service.
  service = TestBed.inject(SaveUrlService);
  httpClient = TestBed.inject(HttpClient);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

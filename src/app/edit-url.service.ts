import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlModel } from './shared/models/url.model';

@Injectable({
  providedIn: 'root'
})
export class EditUrlService {
  private _url = 'http://localhost:3000/api/urlMgr/edit';

  constructor(private _http: HttpClient) { }


  editOne(record: UrlModel) {
    console.log(record._id);
    const endPoint = this._url + '/' + record._id;
    this._http.post<string>(endPoint, record).subscribe(
      () => alert('success!'),
      (error) => alert('error!\n' + error)
    )
  }

}

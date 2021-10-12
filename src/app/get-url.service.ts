import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlModel } from "./shared/models/url.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUrlService {

  private _url = "http://localhost:3000/api/example";

  constructor(private _http: HttpClient) { }

  getAll() : Observable<UrlModel[]> {
      const endPoint = this._url + "/list";
      return this._http.get<UrlModel[]>(endPoint);
  }

  getObservable(): Observable<string>{
    const endPoint = this._url + "/list";
    return this._http.get<string>(endPoint);
  }


  getOne(recordNum: number) : Observable<string> {
      const endPoint = this._url + "/one" + recordNum;
      return this._http.get<string>(endPoint);
  }

  // getOne(recordNum: number) : UrlModel {
  //     let endPoint = this._url + "/one" + recordNum;
  //     let urlRecord = new UrlModel();
  //     this._http.get<any>(endPoint).subscribe(data => {
  //       console.log(data);
  //       urlRecord = JSON.parse(data);
  //     });
  //   return urlRecord;

  // }
}

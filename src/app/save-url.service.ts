import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlModel } from "./shared/models/url.model";
@Injectable({
  providedIn: 'root'
})
export class SaveUrlService {
  private _url = "http://localhost:3000/api/urlMgr/add";

  constructor(private _http: HttpClient) { }

  save(urlModel : UrlModel): void{
    this._http.post<string>(this._url, urlModel).subscribe(
      () => alert('success!'),
      (error) => alert('error!\n' + error)
    )
  }
}

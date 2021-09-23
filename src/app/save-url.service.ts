import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlModel } from "./shared/models/url.model";

@Injectable({
  providedIn: 'root'
})
export class SaveUrlService {

  private _url = "http://localhost:3000/api/example/add";

  constructor(private _http: HttpClient) { }

  save(urlModel : UrlModel){

    this._http.post<any>(this._url, urlModel).subscribe(
      data => console.log("success!", data),
      error => console.log("error!", error)
    )
  }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable(
    {
      providedIn: 'root',
    })
export class GetUrlService {
  private _url = 'http://localhost:3000/api/example';

  constructor(private _http: HttpClient) { }

  getAll(): Observable<string> {
    const endPoint = this._url + '/list';
    return this._http.get<string>(endPoint);
  }

  getOne(recordNum: number): Observable<string> {
    const endPoint = this._url + '/one' + recordNum;
    return this._http.get<string>(endPoint);
  }
}

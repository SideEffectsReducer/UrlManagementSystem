import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteUrlService {
  private _urlDelete = 'http://localhost:3000/api/example/delete';

  constructor(private _http : HttpClient) { }

  deleteRecord(idToRemove: number): Observable<string>{
    const body = {id: idToRemove};
    return this._http.delete<string>(this._urlDelete, {body: body});
}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/********************* */
// TO DO:
// - insted of record number use unique id for getting url Record
/********************* */

@Injectable({
  providedIn: 'root'
})
export class DeleteUrlService {
  private _urlDelete = 'http://localhost:3000/api/urlMgr/delete';

  constructor(private _http : HttpClient) { }

  deleteRecord(idToRemove: number): Observable<string>{
    const body = {id: idToRemove};
    return this._http.delete<string>(this._urlDelete, {body: body});
}
}

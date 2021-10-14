import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteUrlService {
  private _urlDelete = 'http://localhost:3000/api/example/delete';

  constructor(private _http : HttpClient) { }

  deleteRecord(idToRemove: number): Observable<any>{
    const body = {id: idToRemove};
    if (confirm(`Are you sure you want to delete record #${idToRemove} ?`)) {
      console.log('User allowed');
    
        return this._http.delete<any>(this._urlDelete, {body: body});

    } 
    else {
        console.log('User not allowed');
    }
      return of(0);
}
}

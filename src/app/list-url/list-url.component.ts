import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { UrlModel } from '../shared/models/url.model';
import {GetUrlService} from '../get-url.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-url',
  templateUrl: './list-url.component.html',
  styleUrls: ['./list-url.component.less'],
  providers: [GetUrlService]
})
export class ListUrlComponent implements OnInit {

  @Output() addUrlEvent : EventEmitter<string>;
  @Output() viewUrlEvent : EventEmitter<Record<string, number>>;
  private _listOfUrlRecords : UrlModel[];
  private _urlDelete = 'http://localhost:3000/api/example/delete';

  constructor(private _http :HttpClient, private _getUrlService: GetUrlService) {
    this.addUrlEvent = new EventEmitter<string>();
    this.viewUrlEvent = new EventEmitter<Record<string, number>>();
    this._listOfUrlRecords = new Array<UrlModel>();
  }
  ngOnInit(): void {
    this.updateTable();
  }

 public get listOfUrlRecords(): UrlModel[]{
    return this._listOfUrlRecords;
  }

 public set listOfUrlRecords(urlList: UrlModel[]){
  this._listOfUrlRecords = urlList;
}

  updateTable(): void{
    this._getUrlService.getAll().subscribe(data => {
      this.listOfUrlRecords = JSON.parse(data);
    });
  }

  notifySwitchToAddPage() :void {
    this.addUrlEvent.emit('add');
  }

  notifySwitchToViewPage(id: number): void{
    this.viewUrlEvent.emit({'view': id});
  }

deleteRecord(idToRemove: number): void{
    const body = {id: idToRemove};
    if (confirm(`Are you sure you want to delete record #${idToRemove} ?`)) {
      console.log('User allowed');
    
        this._http.delete<any>(this._urlDelete, {body: body}).subscribe(data => {
          
        });

    } 
    else {
        console.log('User not allowed');
    }
}
}

import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { UrlModel } from '../shared/models/url.model';
import {GetUrlService} from '../get-url.service';
import {DeleteUrlService} from '../delete-url.service';

@Component({
  selector: 'app-list-url',
  templateUrl: './list-url.component.html',
  styleUrls: ['./list-url.component.less'],
  providers: [GetUrlService, DeleteUrlService]
})
export class ListUrlComponent implements OnInit {

  @Output() addUrlEvent : EventEmitter<string>;
  @Output() viewUrlEvent : EventEmitter<Record<string, number>>;
  private _listOfUrlRecords : UrlModel[];

  constructor(private _getUrlService: GetUrlService, private _deleteUrlService : DeleteUrlService) {
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
    if(this.doesUserConfirmed(idToRemove)){
      this._deleteUrlService.deleteRecord(idToRemove).subscribe();
    } 
    else {
      console.log('User not allowed');
    }
}

 private doesUserConfirmed(idToRemove: number): boolean{
  return confirm(`Are you sure you want to delete record #${idToRemove} ?`);
 }
}

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
  public _searchEntry : string;

  constructor(private _getUrlService: GetUrlService, private _deleteUrlService : DeleteUrlService) {
    this.addUrlEvent = new EventEmitter<string>();
    this.viewUrlEvent = new EventEmitter<Record<string, number>>();
    this._listOfUrlRecords = new Array<UrlModel>();
    this._searchEntry = '';
  }
  ngOnInit(): void {
    console.log("init");
    this.updateTable();
  }

 public get listOfUrlRecords(): UrlModel[]{
    return this._listOfUrlRecords;
  }

 public set listOfUrlRecords(urlList: UrlModel[]){
  this._listOfUrlRecords = urlList;
}

public get searchEntry(): string{
  return this._searchEntry;
}

public set searchEntry(aString){
  this.searchEntry= aString;
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

onSearchClicked(){
  console.log("search clicked");
  console.log(this.searchEntry);
  this.listOfUrlRecords = this.listOfUrlRecords.filter(record =>{
    return this.searchThroughCategories(record, this.searchEntry);
  })
}

searchThroughCategories(record:UrlModel, searchString: string): boolean{
  return record.title.includes(this.searchEntry); 
        //  || record.tagName.includes(this.searchEntry)
        //  || record.urlLocation.includes(this.searchEntry)
        //  || record.url.includes(this.searchEntry);
}

}

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
  public _columnsName : string[];
  public _selectedColumnName : string;
  public _viewAllCategories :boolean ;
  public _maxNumberOfRecords : number;
  public _currentPageDisplayed :number;

  constructor(private _getUrlService: GetUrlService, private _deleteUrlService : DeleteUrlService) {
    this.addUrlEvent = new EventEmitter<string>();
    this.viewUrlEvent = new EventEmitter<Record<string, number>>();
    this._listOfUrlRecords = new Array<UrlModel>();
    this._searchEntry = '';
    this._columnsName = ['title', 'url', 'tagName', 'urlLocation', 'active', 'type',
                         'pdfStored', 'urlTracked'];
    this._selectedColumnName = 'View all categories';
    this._viewAllCategories = true;
    this._maxNumberOfRecords = 10;
    this._currentPageDisplayed = 1;
  }
  ngOnInit(): void {
    console.log("init");
    this.updateTable();
  }

 public get selectedColumnName(): string{
   return this._selectedColumnName;
 }

 public set selectedColumnName(aString: string){
    this._viewAllCategories = false;
    this._selectedColumnName = aString;
   if('View all categories' == aString){
      this._viewAllCategories = true;
   }
 }

 public get listOfUrlRecords(): UrlModel[]{
    const firstElementIndex = this._maxNumberOfRecords * (this._currentPageDisplayed - 1);
    const lastElementIndex = this._maxNumberOfRecords * this._currentPageDisplayed;
    return this._listOfUrlRecords.slice(firstElementIndex,lastElementIndex);
  }

 public set listOfUrlRecords(urlList: UrlModel[]){
  this._listOfUrlRecords = urlList;
}

public get searchEntry(): string{
  return this._searchEntry;
}

public set searchEntry(aString){
  this._searchEntry= aString;
}

  getUrlModelField(urlRecord: UrlModel, fieldName : string): string{
    return (urlRecord as any)[fieldName];
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
  this.listOfUrlRecords = this._listOfUrlRecords.filter(record =>{
    return this.searchThroughCategories(record, this.searchEntry);
  })
}

searchThroughCategories(record:UrlModel, searchString: string): boolean{
  return record.title.includes(this.searchEntry)
         || record.tagName.includes(this.searchEntry)
         || record.urlLocation.includes(this.searchEntry)
         || record.url.includes(this.searchEntry);
}

prevPage(){
  this._currentPageDisplayed -= 1;
}
firstPage(){
  this._currentPageDisplayed = 1;
}
secondPage(){
  this._currentPageDisplayed = 2;
}
thirdPage(){
  this._currentPageDisplayed = 3;
}
fourthPage(){
  this._currentPageDisplayed = 4;
}
nextPage(){
  this._currentPageDisplayed += 1;
}

calculateNewUrlIdForPage(regularId: number){
  return regularId + (this._currentPageDisplayed - 1)* this._maxNumberOfRecords;
}


}

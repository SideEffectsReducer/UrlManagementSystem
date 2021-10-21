import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { UrlModel } from '../shared/models/url.model';
import {GetUrlService} from '../get-url.service';
import {DeleteUrlService} from '../delete-url.service';
import * as _ from "lodash";

@Component({
  selector: 'app-list-url',
  templateUrl: './list-url.component.html',
  styleUrls: ['./list-url.component.less'],
  providers: [GetUrlService, DeleteUrlService]
})
export class ListUrlComponent implements OnInit {
  readonly _ = _;
  public  NUMBER_OF_PAGES: number;
  @Output() addUrlEvent : EventEmitter<string>;
  @Output() viewUrlEvent : EventEmitter<Record<string, number>>;
  private _listOfUrlRecords : UrlModel[];
  private _searchEntry : string;
  private _columnsName : string[];
  private _selectedColumnNames : string[];
  private _viewAllCategories :boolean ;
  private _maxNumberOfRecords : number;
  private _currentPageDisplayed :number;

  constructor(private _getUrlService: GetUrlService, private _deleteUrlService : DeleteUrlService) {
    this.addUrlEvent = new EventEmitter<string>();
    this.viewUrlEvent = new EventEmitter<Record<string, number>>();
    this._listOfUrlRecords = new Array<UrlModel>();
    this._searchEntry = '';
    this._columnsName = ['_id','title', 'url', 'tagName', 'urlLocation', 'active', 'type',
                         'pdfStored', 'urlTracked'];
    this._selectedColumnNames = [];
    this._viewAllCategories = true;
    this._maxNumberOfRecords = 10;
    this._currentPageDisplayed = 1;
    this.NUMBER_OF_PAGES = 0;
  }
  ngOnInit(): void {
    console.log("init");
    this.updateTable();
  }

public get currentPageDisplayed(): number{
  return this._currentPageDisplayed;
}

public set currentPageDisplayed(aNumber : number){
  this._currentPageDisplayed = aNumber;
}

public get maxNumberOfRecords() : number{
  return this._maxNumberOfRecords;
}

public set maxNumberOfRecords(aNumber : number){
  this._maxNumberOfRecords = aNumber;
}

public get columnsName() : string[]{
  return this._columnsName;
}

public set columnsName(aArray : string[]){
  this._columnsName = aArray;
}

public get viewAllCategories() : boolean{
  return this._viewAllCategories;
}

public set viewAllCategories(aBoolean : boolean){
  this._viewAllCategories = aBoolean;
}

 public get selectedColumnNames(): string[]{
   return _.cloneDeep(this._selectedColumnNames);
 }

 public onFilterColumnNameClick(aString : string){
    if(this._selectedColumnNames.find(value => value === aString) === undefined){
      this._selectedColumnNames.push(aString);
    }
    else{
      _.remove(this._selectedColumnNames, value => value === aString);
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

public set searchEntry(aString : string){
  this._searchEntry= aString;
}

  getUrlModelField(urlRecord: UrlModel, fieldName : string): string{
    return (urlRecord as any)[fieldName];
  }

  updateTable(): void{
    this._getUrlService.getAll().subscribe(data => {
      this.listOfUrlRecords = JSON.parse(data);
      this.NUMBER_OF_PAGES = this._listOfUrlRecords.length;
    });
  }

  notifySwitchToAddPage() :void {
    this.addUrlEvent.emit('add');
  }

  notifySwitchToViewPage(id: number): void{
    this.viewUrlEvent.emit({'view': id});
  }

  notifySwitchToEditPage(id: number): void{
    this.viewUrlEvent.emit({'edit': id});
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

onSearchClicked() : void{
  this._listOfUrlRecords = this._listOfUrlRecords.filter(record =>{
    return this.searchThroughCategories(record, this.searchEntry);
  })
  this.currentPageDisplayed = 1;
}

private searchThroughCategories(record : UrlModel, searchString: string): boolean{
  return record.title.includes(searchString)
         || record.tagName.includes(searchString)
         || record.urlLocation.includes(searchString)
         || record.url.includes(searchString);
}

prevPage() : void{
  this._currentPageDisplayed -= 1;
}
pageClicked(pageNumber : number) : void{
  this._currentPageDisplayed = pageNumber;
}
nextPage() : void{
  this._currentPageDisplayed += 1;
}

public calculateNewUrlIdForPage(regularId: number) : number{
  return regularId + (this._currentPageDisplayed - 1)* this._maxNumberOfRecords;
}


}

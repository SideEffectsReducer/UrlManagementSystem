import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {UrlModel} from "../shared/models/url.model";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-url',
  templateUrl: './view-url.component.html',
  styleUrls: ['./view-url.component.less']
})
export class ViewUrlComponent implements OnInit {

  public urlModel = new UrlModel();
  @Input() viewId = 0;
  @Output() backUrlEvent = new EventEmitter<string>();

  private listOfUrlRecords = Array<UrlModel>();
  private _url = "http://localhost:3000/api/example/list"

  constructor(private _http: HttpClient){ }

  ngOnInit(): void {
    this.urlModel = Object.assign({}, this.urlModel, {
    title: "aTitle",
    tagName: "aTagName",
    url: "aUrl",
    urlLocation: "aUrlLocation",
    active: true,
    type: "aType",
    pdfLocation: "aPdfLocation",
    pdfStored: true,
    urlTracked: true
    });

  }

public notifySwitchToListPage() {
    this.backUrlEvent.emit("list");
  }

public getUrlList(): Observable<string>{
  return this._http.get<string>(this._url);
}

public updateTable(){
    this.getUrlList().subscribe(data => {
      this.listOfUrlRecords = JSON.parse(data);
      this.updateRecord(this.listOfUrlRecords[this.viewId]);
    });
  }

public updateRecord(record: UrlModel){
  this.urlModel = record;
}





}

import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {UrlModel} from "../shared/models/url.model";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-url',
  templateUrl: './view-url.component.html',
  styleUrls: ['./view-url.component.less']
})
export class ViewUrlComponent implements OnInit {

  public listOfUrlRecords = Array<UrlModel>();
  public urlModel = new UrlModel();
  private _url = "http://localhost:3000/api/example/list"
  @Input() viewId = 0;

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

    this.updateTable();
  }

updateTable(){
    this._http.get<any>(this._url).subscribe(data => {
      console.log("start");
      console.log(data);
      this.listOfUrlRecords = JSON.parse(data);
      console.log(this.urlModel);
      console.log("First record: ", this.listOfUrlRecords[0]);
      this.updateRecord(this.listOfUrlRecords[this.viewId]);
    });
  }

updateRecord(record: UrlModel){
  this.urlModel = record;
}


  @Output() backUrlEvent = new EventEmitter<string>();

  notifySwitchToListPage() {
    this.backUrlEvent.emit("list");
  }


}

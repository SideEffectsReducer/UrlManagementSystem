import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { UrlModel } from '../shared/models/url.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-url',
  templateUrl: './list-url.component.html',
  styleUrls: ['./list-url.component.less']
})
export class ListUrlComponent implements OnInit {

  public urlModel = new UrlModel();
  public listOfUrlRecords = Array<UrlModel>();
  private _url = "http://localhost:3000/api/example/list";
  private _urlDelete = "http://localhost:3000/api/example/delete";

  constructor(private _http: HttpClient) { }

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
      });
    }

deleteRecord(idToRemove: number){
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

  @Output() addUrlEvent = new EventEmitter<string>();
  @Output() viewUrlEvent = new EventEmitter<Object>();

  notifySwitchToAddPage() {
    this.addUrlEvent.emit("add");
  }

    notifySwitchToViewPage(id: number) {
      console.log("emit view", id);
    this.viewUrlEvent.emit({'view': id});
  }





  redirectToPDF(id: number){

  }
}

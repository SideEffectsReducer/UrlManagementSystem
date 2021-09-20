import { Component, OnInit } from '@angular/core';
import {UrlModel} from "../shared/models/url.model";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.less']
})
export class AddUrlComponent implements OnInit {

  public urlModel = new UrlModel();
  public externalType = true;
  _url = "http://localhost:3000/api/add";


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

  }

  onSubmit(){
    console.log("onSubmit()");
    
    //  to do service here
    this._http.post<any>(this._url, this.urlModel);

  }

  onExternalType(externalType: boolean){
    this.urlModel.type = externalType ? "external" : "upload";
    this.externalType = externalType;
    console.log(this.urlModel.type);
}

}


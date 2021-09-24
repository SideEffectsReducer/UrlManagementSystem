import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import {UrlModel} from "../shared/models/url.model";
import { SaveUrlService } from '../save-url.service';

@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.less'],
  providers: [SaveUrlService]
})
export class AddUrlComponent implements OnInit {

  public urlModel = new UrlModel();
  public externalType = true;


  constructor(private saveUrlService: SaveUrlService) { }

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

    this.saveUrlService.save(this.urlModel);
    //  to do service here

  }

  onExternalType(externalType: boolean){
    this.urlModel.type = externalType ? "external" : "upload";
    this.externalType = externalType;
    console.log(this.urlModel.type);
}

  @Output() backUrlEvent = new EventEmitter<string>();

  sendMessage() {
    this.backUrlEvent.emit("list");
  }


}


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

  public externalType = true;
  @Output() backUrlEvent = new EventEmitter<string>();
  public urlModel : UrlModel;


  constructor(private saveUrlService: SaveUrlService){
    this.urlModel = Object.assign({}, new UrlModel(), {
    title: '',
    tagName: '',
    url: '',
    urlLocation: '',
    active: false,
    type: '',
    pdfLocation: '',
    pdfStored: false,
    urlTracked: false
    });
   }

  ngOnInit(): void {

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


  notifySwitchToListPage() {
    this.backUrlEvent.emit("list");
  }


}


import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import {UrlModel} from "../shared/models/url.model";
import {SaveUrlService} from '../save-url.service';

/********************* */
// TO DO:
// - html form validation
/********************* */
@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.less'],
  providers: [SaveUrlService]
})
export class AddUrlComponent implements OnInit {
  externalType = true;
  _urlRecord : UrlModel;
  @Output() backUrlEvent : EventEmitter<string>;

  constructor(private saveUrlService: SaveUrlService){
    this.externalType = true;
    this.backUrlEvent = new EventEmitter<string>();
    this._urlRecord = Object.assign({}, new UrlModel(), {
    _id: null,
    title: '',
    tagName: '',
    url: '',
    urlLocation: '',
    active: false,
    type: 'external',
    pdfLocation: '',
    pdfStored: false,
    urlTracked: false
    });
   }

  ngOnInit(): void {
  // nothing here
  }

  get urlRecord(): UrlModel{
    return this._urlRecord;
  }

  set urlRecord(urlRecord: UrlModel){
    this._urlRecord = urlRecord;
  }

  onSubmit() : void{
    this.saveUrlService.save(this.urlRecord);
  }

  onExternalType(externalType: boolean): void{
    if(!externalType){
      alert('not implemented yet');
    }
    this.urlRecord.type = externalType ? 'external' : 'upload';
    this.externalType = externalType;
}

  notifySwitchToListPage(): void {
    this.backUrlEvent.emit("list");
  }
}

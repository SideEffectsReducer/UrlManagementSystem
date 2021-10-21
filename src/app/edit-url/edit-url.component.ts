import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { EditUrlService } from '../edit-url.service';
import { GetUrlService } from '../get-url.service';
import { UrlModel } from '../shared/models/url.model';

@Component({
  selector: 'app-edit-url',
  templateUrl: './edit-url.component.html',
  styleUrls: ['./edit-url.component.less'],
  providers: [EditUrlService, GetUrlService],
})
export class EditUrlComponent implements OnInit {

  @Input() viewId: number;
  @Output() backUrlEvent: EventEmitter<string>;
  private _urlRecord : UrlModel;

  constructor(private _editUrlService: EditUrlService, private _getUrlService: GetUrlService) {
    this.viewId = 0;
    this.backUrlEvent = new EventEmitter<string>();

    this._urlRecord = Object.assign({}, new UrlModel(), {
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
    this.fillViewWithRecievedData();
  }

public get urlRecord(){
  return this._urlRecord;
}

public set urlRecord(aUrl: UrlModel){
  this._urlRecord = aUrl;
}

public notifySwitchToListPage(): void {
  this.backUrlEvent.emit('list');
}

private fillViewWithRecievedData() {
    this._getUrlService.getOne(this.viewId).subscribe((data) => {
      this.urlRecord = JSON.parse(data);
    });
}

onSaveButtonClick(){
  this._editUrlService.editOne(this.urlRecord);
}

}

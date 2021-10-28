import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {UrlModel} from '../shared/models/url.model';
import {GetUrlService} from '../get-url.service';

/********************* */
// TO DO:
// - html form validation
/********************* */

@Component({
  selector: 'app-view-url',
  templateUrl: './view-url.component.html',
  styleUrls: ['./view-url.component.less'],
  providers: [GetUrlService],
})
export class ViewUrlComponent implements OnInit {
  @Input() viewId: number;
  @Output() backUrlEvent: EventEmitter<string>;
  private _urlRecord: UrlModel;

  constructor(private _getUrlService: GetUrlService) {
    this.viewId = 0;
    this.backUrlEvent = new EventEmitter<string>();
    this._urlRecord = Object.assign({}, new UrlModel(), {
      _id: 0,
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

  public notifySwitchToListPage(): void {
    this.backUrlEvent.emit('list');
  }

  public set urlRecord(record: UrlModel) {
    this._urlRecord = record;
  }

  public get urlRecord(): UrlModel {
    return this._urlRecord;
  }

  private fillViewWithRecievedData() {
    this._getUrlService.getOne(this.viewId).subscribe((data) => {
      this.urlRecord = JSON.parse(data);
    });
  }
}

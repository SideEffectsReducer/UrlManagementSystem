import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {UrlModel} from '../shared/models/url.model';
import {GetUrlService} from '../get-url.service';

@Component({
  selector: 'app-view-url',
  templateUrl: './view-url.component.html',
  styleUrls: ['./view-url.component.less'],
  providers: [GetUrlService],
})
export class ViewUrlComponent implements OnInit {
  public urlModel = new UrlModel();
  public _urlRecord = new UrlModel();
  @Input() viewId = 0;
  @Output() backUrlEvent = new EventEmitter<string>();

  constructor(private _getUrlService: GetUrlService) {
    this.urlModel = Object.assign({}, this.urlModel, {
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
    this.updateTable();
  }

  public notifySwitchToListPage(): void {
    this.backUrlEvent.emit('list');
  }

  private updateTable() {
    this._getUrlService.getOne(this.viewId).subscribe((data) => {
      this.urlRecord = JSON.parse(data);
    });
  }

  private set urlRecord(record: UrlModel) {
    this.urlModel = record;
  }

  private get urlRecord(): UrlModel {
    return this.urlModel;
  }
}

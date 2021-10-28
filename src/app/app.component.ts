import { ConditionalExpr } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'UrlManagementSystem';
  public currentView = "list";
  public currentViewId = 0;
  public currentEditId = 0;

  receiveMessage(newEvent: any) {
    if (typeof newEvent == "string") {
      console.log(newEvent);
      this.currentView = newEvent;
    }
    else {
      if (newEvent['view'] != undefined) {
        this.currentViewId = newEvent['view'];
        this.currentView = 'view';
      }
      if (newEvent['edit'] != undefined) {
        this.currentEditId = newEvent['edit'];
        this.currentView = 'edit';
      }
    }
  }


}

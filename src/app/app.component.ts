import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'UrlManagementSystem';
  public currentView = "list";

  receiveMessage(newView: string) {
    this.currentView = newView;
  }


}

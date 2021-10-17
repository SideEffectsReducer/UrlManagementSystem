import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUrlComponent } from './list-url/list-url.component';
import { AddUrlComponent } from './add-url/add-url.component';
import { ViewUrlComponent } from './view-url/view-url.component';
import { EditUrlComponent } from './edit-url/edit-url.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ListUrlComponent,
    AddUrlComponent,
    ViewUrlComponent,
    EditUrlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

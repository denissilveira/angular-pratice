import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './service/in-memory-data.service';

import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyService } from './service/company.service';
import { CompanySearchComponent } from './company-search/company-search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './service/message.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    CompanyComponent,
    CompanyDetailComponent,
    CompanySearchComponent,
    DashboardComponent,
    MessagesComponent
  ],
  providers: [CompanyService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

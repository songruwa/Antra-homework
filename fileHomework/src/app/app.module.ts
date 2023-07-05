import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { FileAccessComponent } from './components/file-access/file-access.component';
import { CandidateInfoService } from './candidata-info.service';

@NgModule({
  declarations: [
    AppComponent,
    FileAccessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CandidateInfoService,],
  bootstrap: [AppComponent]
})
export class AppModule { }

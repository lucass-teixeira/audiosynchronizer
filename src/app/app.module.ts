import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookTranscriptComponent } from './shared/components/book-transcript/book-transcript.component';
import { SharedModule } from './shared/sharedModule';

@NgModule({
  declarations: [
    AppComponent,
    BookTranscriptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

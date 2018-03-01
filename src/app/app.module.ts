import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; // <-- here
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ChatComponent } from './chat/chat.component';
import { TimerComponent } from './timer/timer.component'; // <-- here

import { ChatService } from './chat/chat.service';
import { ChatDetailComponent } from './chat/chat-detail/chat-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    TimerComponent,
    ChatDetailComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    BrowserModule, 
    FormsModule, // <-- here
    RoundProgressModule // <-- and here
  ],
  providers: [
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

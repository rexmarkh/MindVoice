import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { ChatService } from '../chat/chat.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Note } from '../models/Item';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public auth: AuthService,private router: Router,private chatService: ChatService) { }
  notes: Observable<Note[]>;
  content: string;
  note: Note;
  ngOnInit() {
    // this.notes = this.noteService.getData()
    this.notes = this.chatService.getSnapshot();
  }
  logout() {
    this.auth.signOut();
  }

  /// Anonymous Sign In

  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    // this.router.navigate(['/']);
  }

  signInAnonymously() {
    this.auth.anonymousLogin()
      .then(() => this.afterSignIn());
  }

  createNote() {
    this.chatService.create(this.content);
    this.content = '';
  }
}

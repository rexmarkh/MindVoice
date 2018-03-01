import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../chat/chat.service';
import { Note } from '../../models/Item';


@Component({
  selector: 'chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit {


  ngOnInit() {
  }

  @Input()
  note: Note;

  constructor(private chatService: ChatService) { }

  addHeartToNote(val: number) {
    if (this.note.id) {
      this.chatService.updateNote(this.note.id, { hearts: val + 1 });
    } else {
      console.error('Note missing ID!');
    }
  }

  deleteNote(id: string) {
    this.chatService.deleteNote(id);
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from '../services/chat.service';
import { MessagesComponent } from "../messages/messages.component";
import { ChatInputComponent } from "../chat-input/chat-input.component";

@Component({
  selector: 'app-private-chat',
  standalone: true,
  templateUrl: './private-chat.component.html',
  styleUrl: './private-chat.component.scss',
  imports: [MessagesComponent, ChatInputComponent]
})
export class PrivateChatComponent implements OnDestroy {
  @Input() toUser = "";
  constructor(public activeModal: NgbActiveModal, public chatService: ChatService) {
  }

  ngOnDestroy(): void {
    this.chatService.closePrivateChatMessage(this.toUser);
  }

  sendMessage(content: string) {
    this.chatService.sendPrivateMessage(this.toUser, content);
  }

}



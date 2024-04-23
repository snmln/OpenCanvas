import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { CommonModule } from '@angular/common';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { MessagesComponent } from "../messages/messages.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateChatComponent } from '../private-chat/private-chat.component';
@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [CommonModule, ChatInputComponent, MessagesComponent]
})
export class ChatComponent implements OnInit, OnDestroy {
  @Output() closeChatEmitter = new EventEmitter();

  constructor(public chatService: ChatService, private modalService: NgbModal) { }
  ngOnDestroy(): void {
    this.chatService.stopChatConnection();
  }
  ngOnInit(): void {
    this.chatService.createChatConnection();
  }

  backToHome() {
    this.closeChatEmitter.emit();
  }

  sendMessage(content: string) {
    this.chatService.sendMessage(content)
  }
  openPrivateChat(toUser: string) {

    const modalRef = this.modalService.open(PrivateChatComponent)
    modalRef.componentInstance.toUser = toUser;
  }
}

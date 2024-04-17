import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  @Output() closeChatEmitter = new EventEmitter();

  constructor(public chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.createChateConnection();
  }

  backToHome() {
    this.closeChatEmitter.emit();
  }

}

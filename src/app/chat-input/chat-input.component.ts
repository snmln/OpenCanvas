import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent implements OnInit {
  content: string = '';
  @Output() contentEmitter = new EventEmitter();

  ngOnInit(): void {

  }
  sendMessage() {
    if (this.content.trim() !== "") {
      this.contentEmitter.emit(this.content);
    }
    this.content = '';
  }
}

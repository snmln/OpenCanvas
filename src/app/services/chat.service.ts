import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';


@Injectable({
  providedIn: 'root'
})

export class ChatService {
  myName: string = '';
  private chatConnection?: HubConnection;
  onlineUsers: string[] = [];

  constructor(private httpClient: HttpClient) { }
  registerUser(user: User) {
    return this.httpClient.post(`${environment.apiUrl}api/chat/register-user`, user, { responseType: 'text' });
  }
  createChateConnection() {
    this.chatConnection = new HubConnectionBuilder().withUrl(`${environment.apiUrl}hubs/chat`).withAutomaticReconnect().build();
    this.chatConnection.start().catch(error => { console.log(error) })
    this.chatConnection.on('UserConnected', () => {
      this.addUserConnectionId();
    });
    this.chatConnection.on('OnlineUsers', (onlineUsers) => {
      this.onlineUsers = [...onlineUsers];

    });
  }
  stopChatConnection() {
    this.chatConnection?.stop().catch(error => { console.log(error) });
  }
  async addUserConnectionId() {
    return this.chatConnection?.invoke('AddUserConnectionId', this.myName).catch(error => console.log(error));
  }
}

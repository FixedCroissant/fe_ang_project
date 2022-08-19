import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  constructor() {}

  //Functions
  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}

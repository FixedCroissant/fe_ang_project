import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // ...

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return false;

    //Check whether the token is expired and return true or false.
    //need library.
    //return !
  }
}

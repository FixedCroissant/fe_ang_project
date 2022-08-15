import { Injectable } from '@angular/core';
//Allow Observable
import { Observable, of } from 'rxjs';
//Get helpful operators.
import { catchError, map, pluck, tap } from 'rxjs/operators';

//Get HTTP service.
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Import our message service.
import { MessageService } from './message.service';

//Interface
import { User } from './user';
//Mock API
import { USERS } from './mock-users';
//External API interface
import { UserExternalServerResponse } from './user-external';

//Get our environment information
import { environment } from '../environments/environment';

//Must come before exportable class.
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = environment['API_REST_URL'];
  private apiPort = environment['API_REST_PORT'];
  // URL to web api
  private apiUrlADDRESS = 'api';

  //HTTP OPTIONS FOR JSON.
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  //Return mock users.
  /*
  getUsers(): User[] {
    return USERS;
  }*/

  //Adjust for observables
  getUsers(): Observable<User[]> {
    //MOCK USERS IN SYSTEM.
    //const theUsers = of(USERS);

    //Use HTTP
    const theUsers = this.http.get<User[]>(
      `${this.apiURL}:${this.apiPort}/${this.apiUrlADDRESS}`
    );

    //Use our Message Service.
    this.messageService.add('UserService: fetched users from http');

    //Local have access to formed API.
    return theUsers;
  }

  //External API
  //Random User API that I cannot control.
  getUsersOutside(): Observable<UserExternalServerResponse[]> {
    //Use HTTP
    //Gets only one item out of the External UserAPI
    const theExternalUsers = this.http.get<UserExternalServerResponse>(
      `${this.apiURL}:${this.apiPort}/${this.apiUrlADDRESS}`
    );

    //Use our Message Service.
    this.messageService.add(
      'UserService: fetched external users from outside API'
    );

    //External API from RANDOM API
    return theExternalUsers.pipe(map((results) => results.results));

    //return theExternalUsers;
  }

  //Get Specific User
  //MOCK SERVER.
  /*getUser(id: number): Observable<User> {
    // For now, assume that a user with the specified `id` always exists.
    const myUser = USERS.find((u) => u.id === id)!;
    console.log(`Running from getUser `);
    this.messageService.add(`UserService: fetched user id=${id}`);
    //return of(myUser);
  }*/

  //USE HTTP
  getUser(id: number): Observable<User> {
    const url = `${this.apiURL}:${this.apiPort}/${this.apiUrlADDRESS}/${id}`;

    //

    return this.http.get<User>(url).pipe(
      tap((_) => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  //Update our USer
  updateUser(user: User): Observable<any> {
    //Update user information.
    //URL of API
    const url = `${this.apiURL}:${this.apiPort}/${this.apiUrlADDRESS}/${user.id}`;

    return this.http.put(url, user, this.httpOptions).pipe(
      tap((_) => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  //Add User in System
  addUser(user: User): Observable<User> {
    //POST /Users
    const url = `${this.apiURL}:${this.apiPort}/${this.apiUrlADDRESS}`;

    //Send Post
    return this.http.post<User>(url, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added USER w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  //Delete User
  /** DELETE: delete the hero from the server */
  deleteUser(id: number): Observable<User> {
    //URL of API To DELETE
    const url = `${this.apiURL}:${this.apiPort}/${this.apiUrlADDRESS}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

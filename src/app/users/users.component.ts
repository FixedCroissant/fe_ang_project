import { Component, OnInit } from '@angular/core';

//Internal User
import { User } from '../user';
//External user
import { UserExternalServerResponse } from '../user-external';

//Mock users from service.
import { UserService } from '../user.service';

//Get Messages service
import { MessageService } from '../message.service';
import { last } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  //Set our User
  users: User[] = [];
  //External Users with a different setup
  myExternalUsers: UserExternalServerResponse[] = [];

  selectedUser?: User;

  constructor(
    private userService: UserService,
    private messageService: MessageService
  ) {}

  getUsers(): void {
    //Non observable; happens syncronously
    //this.users = this.userService.getUsers();
    //Observable version that is in the user.service; happens asyncronously
    //Could load up immedately or within 5 minutes.
    //Based on our internal db.
    //this.userService.getUsers().subscribe((user) => (this.users = user));
    //External API.

    //Get our external data and send it somewhere.
    this.userService
      .getUsersOutside()
      .subscribe((ExternalUser) => (this.myExternalUsers = ExternalUser));

    //debug stuff.
    console.log('Getting information from a external API.');
    /*this.userService.getUsersOutside().subscribe((randoUser) => {
      randoUser.map((userdata) => {
        console.log('cellphone is:');
        console.log(userdata.cell);
        console.log(`gender is:`);
        console.log(userdata.gender);
        //get name
        console.log(userdata.name);
        console.log(userdata.name.title);
        console.log(userdata.name.first);
        console.log(userdata.name.last);
        console.log(`The persons date and age is...`);
        console.log(userdata.dob.date);
        console.log(userdata.dob.age);

        */

    //});

    //});
  }

  //Add new USer.
  add(firstName: string): void {
    //Values
    //name = name.trim();
    //firstName = name.trim();

    console.log(`This is what is passed over in name ${firstName}`);

    console.log(firstName);
    if (!firstName) {
      return;
    }
    this.userService.addUser({ firstName } as User).subscribe((user) => {
      //Update our user.
      this.users.push(user);
    });
  }

  //Delete User
  delete(user: User): void {
    this.users = this.users.filter((h) => h !== user);
    //Call Service
    //this.heroService.deleteHero(hero.id).subscribe();
    this.userService.deleteUser(user.id).subscribe();
  }

  ngOnInit(): void {
    //Call our userservice immediately.

    this.getUsers();
  }
}

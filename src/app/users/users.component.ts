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

//Use form builder
import { FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  //Form Used

  //Set our User, using our interface
  //Set of a number of users.
  users: User[] = [];

  //My user interface
  //Singular Model.
  myUser: User = {
    id: 1,
    title: '',
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  };

  // myUser = this.formBuilder.group({
  //   id: 1,
  //   title: '',
  //   name: '',
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   role: '',
  // });

  //External Users with a different setup
  myExternalUsers: UserExternalServerResponse[] = [];

  selectedUser?: User;

  //Form information
  //Using directive.
  /*newUserForm = this.formBuilder.group({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    password: '',
    passwordconfirm: '',
  });*/
  //end form information

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {}

  getUsers(): void {
    //Non observable; happens syncronously
    //this.users = this.userService.getUsers();
    //Observable version that is in the user.service; happens asyncronously
    //Could load up immedately or within 5 minutes.
    //Based on our internal db.
    console.log(`Getting information from internal API`);
    this.userService.getUsers().subscribe((user) => (this.users = user));

    //External API.
    //Get our external data and send it somewhere.
    /*this.userService
      .getUsersOutside()
      .subscribe((ExternalUser) => (this.myExternalUsers = ExternalUser));*/

    //debug stuff.
    //console.log('Getting information from a external API.');
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
    //Call Service to delete the person.
    this.userService.deleteUser(user.id as number).subscribe();
  }

  //Temporary Submit new data
  //Provide a ngForm parameter to adjust after submission.
  onSubmit(myForm: NgForm): void {
    // Process checkout data here
    //this.items = this.cartService.clearCart();
    //console.warn('Your new user has been submitted', this.newUserForm.value);
    console.warn('Your new user has been submitted');

    //Add user to backend.
    //USer will have information about my users.
    this.userService.addUser(this.myUser as User).subscribe((newUser) => {
      //Double checkwhat is being sent over.
      console.warn(`New user is this: ${this.myUser}`);
      //add our user to our array of users, that is at the top of the page.
      //Response information back from the server.
      //Adjust number
      this.myUser.id = newUser.id;
      //Add to the array of Users.
      this.users.push(this.myUser);

      //ToDo-Clear form.
      //this.userService;
      //.addUser(this.newUserForm.value as User)
      /* .subscribe((user) => {
        //Update our user.
        //this.users.push(user);
      });*/

      //clear out our form.
      this.clearUser();

      //Reset validation.
      myForm.resetForm();
    });
  }

  //Reset.
  clearUser() {
    //Clear out our user.
    this.myUser = {
      id: 1,
      title: '',
      name: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    };
  }

  //On initialization.s
  ngOnInit(): void {
    //Call our userservice immediately.

    this.getUsers();
  }
}

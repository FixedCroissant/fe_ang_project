import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  User: User[] = [];

  constructor(private userService: UserService) {}

  //On component load.
  ngOnInit(): void {}

  getUsers(): void {
    //Get our user from our service
    //Get only the second, third, fourth and fifth user.
    this.userService
      .getUsers()
      .subscribe((user) => (this.User = user.slice(1, 5)));
  }
}

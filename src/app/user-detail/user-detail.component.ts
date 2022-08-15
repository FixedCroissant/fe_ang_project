import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  User: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getUser();
  }

  goBack(): void {
    this.location.back();
  }

  //Save our User Information
  save(): void {
    if (this.User) {
      this.userService.updateUser(this.User).subscribe(() => this.goBack());
    }
  }

  getUser(): void {
    //Extract our unique ID from the activated route.
    const id = Number(this.route.snapshot.paramMap.get('id'));
    //Now look up our specific User based on the id we're looking for in the URL.
    this.userService.getUser(id).subscribe((User) => (this.User = User));
  }
}

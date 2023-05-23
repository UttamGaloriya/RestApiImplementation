import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { userObj } from 'src/app/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  User?: userObj
  constructor(private userServices: UserService) { }

  ngOnInit(): void {
    this.User = this.userServices.userValue
  }
  logOut() {
    this.userServices.logOut()
  }
}

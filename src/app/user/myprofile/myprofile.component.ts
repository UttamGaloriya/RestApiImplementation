import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { userObj } from 'src/app/user';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  User?: userObj
  constructor(private services: UserService) { }

  ngOnInit(): void {

    this.User = this.services.userValue

  }

}

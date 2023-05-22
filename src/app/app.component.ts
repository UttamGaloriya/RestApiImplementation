import { Component } from '@angular/core';
import { UserService } from './_services/user.service';
import { userObj } from './user';
import { AlertService } from './_services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  constructor(private userServices: UserService, private alert: AlertService) { }
  ngOnInit() { }

}

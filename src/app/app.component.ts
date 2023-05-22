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

  datax: userObj = {
    fisrtName: "uttam",
    lastName: "string",
    gender: "mail",
    username: "uttam",
    email: "uttam@gmail.com",
    password: '0lelplR',

  }
  data_up: userObj = {
    fisrtName: "uttam_galoriya",
    lastName: "string",
    gender: "mail",
    username: "uttam_galoriya",
    email: "uttam@gmail.com",
    password: '0lelplR',

  }
  login_user = {
    username: 'kminchelle',
    password: '0lelplR',
  }
  title = 'RestApiImplementation';


  constructor(private userServices: UserService, private alert: AlertService) { }
  ngOnInit() {
    // this.userServices.postData(this.datax).subscribe(
    //   (data: any) => { console.log(data) },
    //   (error: any) => { console.log(error) },
    //   () => console.log('HTTP request completed.')

    // )
    // this.userServices.updateData(this.data_up, 10).subscribe(

    //   (data: any) => { console.log(data) },
    //   (error: any) => { console.log(error) },
    //   () => console.log('HTTP request completed.')
    // )

    // this.userServices.getAllData().subscribe(
    //   (data: any) => { console.log(data) },
    //   (error: any) => { console.log(error) },
    //   () => console.log('HTTP request completed.')
    // )

    // this.userServices.login(this.login_user).subscribe(
    //   (data: any) => {
    //     console.log(data)
    //     this.alert.showNotification("congress", "ok", "error")
    //   },
    //   (error: any) => { console.log(error.ok) },
    //   () => console.log('HTTP request completed.')
    // )
  }
}

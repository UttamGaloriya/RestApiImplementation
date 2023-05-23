import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { userObj } from '../user';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "https://dummyjson.com";
  userValueData: any | null = 0;

  constructor(private http: HttpClient, private router: Router, private alert: AlertService) { }

  //post user
  postData(data: userObj): Observable<any> {
    return this.http.post(`${this.baseURL}/users/add`, data)
  }

  //upadate user
  updateData(data: userObj, id: number): Observable<any> {
    return this.http.put(`${this.baseURL}/users/${id}`, data)
  }

  //delete user
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/users/${id}`)
  }

  //get all user
  getAllData(): Observable<any> {
    return this.http.get(`${this.baseURL}/users/`)
  }
  //get user
  getUserData(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/users/${id}`)
  }

  //login user
  login(user: any): Observable<any> {
    return this.http.post(`${this.baseURL}/auth/login`, user)
  }


  // data get
  public get userValue() {
    const onedb = localStorage.getItem('onedata');
    if (onedb !== null) {
      const list = JSON.parse(onedb)
      this.userValueData = list[0]
    }
    return this.userValueData
  }

  //userLogin
  userLogin(user: any) {
    this.login(user).subscribe(
      (data: any) => {
        localStorage.removeItem('onedata')
        const userArr = [];
        userArr.push(data);
        localStorage.setItem('onedata', JSON.stringify(userArr));
        console.log(data)
        this.alert.showNotification("congratulations", "ok", "success")
      },
      (error: any) => { this.alert.showNotification("invalid", "ok", "error") },
      () => this.router.navigateByUrl('/user/table')
    )
  }



  //logOut
  logOut() {
    localStorage.removeItem('onedata')
    this.userValueData = 0
    this.router.navigate(['/account/login'])
  }

}

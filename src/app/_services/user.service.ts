import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { userObj } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "https://dummyjson.com";
  constructor(private http: HttpClient) { }

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




}

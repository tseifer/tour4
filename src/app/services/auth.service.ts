import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = '/api/auth';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  loggedInUserInfo : {};
  constructor(private http: HttpClient, private route : Router) { }


  public isAuthenticated() : Boolean {
    let userData = localStorage.getItem('userInfo')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public async logout()  {
    await this.http.get(`${this.authUrl}/logout`).toPromise()
    console.log('tried sending logout to server')
    //localStorage.clear();
    await this.route.navigate(['login']);
  }

  public setUserInfo(user){
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public validate(email, password) {
    return this.http.post(`${this.authUrl}/login`, {'username' : email, 'password' : password}, this.httpOptions).toPromise()
  }

  public signup(email, password) {
    return this.http.post(`${this.authUrl}/signup`, {'username' : email, 'password' : password}, this.httpOptions).toPromise()
  }
}

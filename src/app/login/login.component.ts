import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  userEmail : String;
  userPassword : String;

  constructor(private authService : AuthService, private router : Router) { }

  login(){
    this.authService.validate(this.userEmail, this.userPassword)
        .then((response) => {
          this.authService.setUserInfo({'user' : response['user']});
          this.router.navigate(['dashboard']);

        })
  }

  signup() {
      this.authService.signup(this.userEmail, this.userPassword)
          .then((response) => {
              //this.authService.setUserInfo({'user' : response['user']});
              this.router.navigate(['login']);

          })
  }

}

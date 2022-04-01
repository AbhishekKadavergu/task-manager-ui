import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { UserLogin } from '../models/login';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginValid = true;
  public username: string = '';
  public password: string = '';

  //snack-bar
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';



  constructor(private auth: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    console.log(this.username)
    console.log(this.password)
    const userCredentails: UserLogin = {
      email: this.username,
      password: this.password
    }
    try {
      const data = await this.auth.login(userCredentails)
      if(!data || data['status']!==200){
        throw new Error("Invalid credentials")
      }
      console.log(data['status'])
      console.log(data)
                      // store user details and jwt token in local storage to keep user logged in between page refreshes
                      localStorage.setItem('currentUser', JSON.stringify(data['body']));
                      const userData:User = {
                        token: "",
                        user: {
                          _id: "",
                          name: "",
                          age: 20,
                          email: ""
                        }
                      }
                      this.auth.currentUserSubject.next(userData);
      this.router.navigateByUrl('/home')

    } catch (error) {
      console.log("Error: ", error['error'])
      console.log("Error: ", error['status'])
      this._snackBar.open('Invalid credentials!!', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5 * 1000
      });

    }

  }

}

import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public loginValid = true;
  public username: string = '';
  email: string = ''
  age:number = 0
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
    const userCredentails = {
      name: this.username,
      email: this.email,
      password: this.password,
      age: this.age
    }
    try {
      const data = await this.auth.register(this.username, this.email, this.password, this.age)
      if (!data || data['status'] !== 201) {
        throw new Error("Something went wrong! Please try again")
      }

      this._snackBar.open('Registered successfully!!', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 7 * 1000
      });
      this.router.navigateByUrl('/login')




      // store user details and jwt token in local storage to keep user logged in between page refreshes
      // localStorage.setItem('currentUser', JSON.stringify(data['body']));
      // const userData: User = {
      //   token: "",
      //   user: {
      //     _id: "",
      //     name: "",
      //     age: 20,
      //     email: ""
      //   }
      // }
      // this.auth.currentUserSubject.next(userData);
      // this.router.navigateByUrl('/home')

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

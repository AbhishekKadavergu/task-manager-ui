import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../models/login';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginURL: string = environment.apiUrl + "/users/login"
  logoutURL: string = environment.apiUrl + "/users/logout"

  registrationURL: string = environment.apiUrl + "/users"

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(name: string, email: string, password: string, age: number) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({ name, email, password, age });
    console.log(body)
    return this.http.post(this.registrationURL, body, { 'headers': headers, observe: 'response' }).toPromise()
    // return this.http.post(this.loginURL, {})
  }

  login({ email, password }: UserLogin) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({ email, password });
    console.log(body)
    return this.http.post<any>(this.loginURL, body, { 'headers': headers, observe: 'response' }).toPromise()
    // return this.http.post(this.loginURL, {})
  }

  logout() {
    return this.http.post<any>(this.logoutURL, null, { observe: "response" }).toPromise()    // remove user from local storage to log user out
    // this.currentUserSubject.next(null);
  }
}

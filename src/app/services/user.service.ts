import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readProfileURL = environment.apiUrl+"/users/me"

  constructor(private http: HttpClient) { }

  readProfile(){
    return this.http.get<any>(this.readProfileURL).toPromise()
  }
}

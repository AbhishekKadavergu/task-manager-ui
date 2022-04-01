import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {
  userName!: string;


  constructor(private router: Router, private auth: AuthService, private user: UserService) { }

  ngOnInit(): void {
    this.getUserProfile()
  }

  async getUserProfile(){
    try {
      const user = await this.user.readProfile()
      if(!user){
        throw new Error("Unable to read profile")
      }
      console.log(user)
      this.userName = user.name
      
    } catch (error) {
      console.log("Error: ", error)      
    }    
  }

  async logout(){
    console.log("Logout")
    try {      
      const data = await this.auth.logout()
      if(!data){
        throw new Error("Something went wrong")
      }
      console.log(data)
      localStorage.removeItem('currentUser');

    } catch (error) {
      console.log("Error: ", error)
      
    }
    this.router.navigateByUrl('/login')
    

  }

}

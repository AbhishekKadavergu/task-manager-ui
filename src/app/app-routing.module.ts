import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './play-ground/test/test.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { DisplayTaskComponent } from './tasks/display-task/display-task.component';

const routes: Routes = [
  {path:"test", component: TestComponent},
  {path:"login", component:LoginComponent},
  {path:"registration", component:RegistrationComponent},
  {path:'', redirectTo:'login', pathMatch: 'full'},
  {path:"home", component:HomeComponent, canActivate: [AuthGuard], children:[
    {path:'', component: DisplayTaskComponent},
    {path:'createTask', component: CreateTaskComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

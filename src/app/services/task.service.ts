import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  createTaskURL = environment.apiUrl+"/tasks"
  getTasksURL = environment.apiUrl+"/tasks"
  updateTaskURL = environment.apiUrl+"/tasks/"
  deleteTaskURL = environment.apiUrl+"/tasks/"

  constructor(private http: HttpClient) { }

  createTask(task: Task){
    return this.http.post(this.createTaskURL, task, {observe:'response'}).toPromise()
  }

  getUserTasks(){
    return this.http.get<any>(this.getTasksURL, {observe:'response'}).toPromise()
  }

  updateTask(task:Task){
    return this.http.patch<Task>(this.updateTaskURL+task._id, {"completed": task.completed, "description": task.description}, {observe: 'response'}).toPromise()

  }

  deleteTask(taskId:string){
    return this.http.delete<any>(this.deleteTaskURL+taskId, {observe: 'response'}).toPromise()
  }
}

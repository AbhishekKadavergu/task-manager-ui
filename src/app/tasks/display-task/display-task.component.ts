import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { UpdateTaskComponent } from '../update-task/update-task.component';

@Component({
  selector: 'app-display-task',
  templateUrl: './display-task.component.html',
  styleUrls: ['./display-task.component.css']
})
export class DisplayTaskComponent implements OnInit {
  tasks: Task[] = []
  columns = [{ "header": "Description", "cell": "description" }, { "header": "Completed", "cell": "completed" }]
  displayedColumns = this.columns.map(c => c.cell);
  // clickedRow = new Set()
  clickedRow: any = []


  constructor(private taskSer: TaskService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserTasks()
  }

  async getUserTasks() {
    try {
      const tasks = await this.taskSer.getUserTasks()
      if (!tasks) {
        throw new Error("Something went wrong!")
      }
      console.log(tasks)
      this.tasks = tasks.body

    } catch (error) {
      console.log("Error: ", error)

    }
  }

  onRowSelect(row: any) {
    console.log(row)
    this.clickedRow = []
    this.clickedRow.push(row)
  }

  editTask() {
    console.log(this.clickedRow?.[0])
   const dialogRef = this.dialog.open(UpdateTaskComponent, {
      data: this.clickedRow?.[0]
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');  
      console.log(result)   
      if(result) {
        this.getUserTasks()
      }
    });
  }

  deleteTask(){
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      data: this.clickedRow?.[0]
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');  
      console.log(result)   
      if(result) {
        this.getUserTasks()
      }
    });
    
  }

  toCreateTask() {
    this.router.navigate(["home/createTask"])
  }

}

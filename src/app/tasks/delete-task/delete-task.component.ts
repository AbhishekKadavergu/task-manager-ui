import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';


@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {

  //snack-bar
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  closeDialog!: boolean;


  constructor(private taskSer: TaskService, public dialogRef: MatDialogRef<DeleteTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: Task, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    console.log("on Cancel clicked")
    this.closeDialog = false
    this.dialogRef.close(false);
  }

  async deleteTask() {
    try {
      const task = await this.taskSer.deleteTask(this.data._id);
      if (!task) {
        throw new Error("Something went wrong")
      }
      console.log(task)
      this.closeDialog = true
      this.dialogRef.close(true);

      this._snackBar.open('Task Deleted Successfully!', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5 * 1000
      });

    } catch (error) {
      console.log("Error: ", error)
    }


  } 


}



import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  formGroup!: FormGroup;
  closeDialog!: boolean;
  

    //snack-bar
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(formBuilder: FormBuilder, private taskSer:TaskService, public dialogRef: MatDialogRef<UpdateTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: Task, private _snackBar: MatSnackBar) {
    this.formGroup = formBuilder.group({
      description: ['', Validators.requiredTrue],
      completed: false
    });
  }

  ngOnInit(): void {
    this.setFormValues(this.data.description, this.data.completed)
  }

  onCancelClick(): void {
    console.log("on Cancel clicked")
    this.closeDialog = false
    this.dialogRef.close(false);
  }




 async  onFormSubmit(){
    console.log(this.formGroup.value)
    try {
     const task = await this.taskSer.updateTask({...this.formGroup.value, _id:this.data._id})   
     if(!task)   {
       throw new Error("Something went wrong!")
     }
     this.closeDialog = true
     console.log(task)
    this.dialogRef.close(true);

     this._snackBar.open('Task Updated Successfully!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000
    });
    } catch (error) {
      console.log("Error: ", error)            
    }
  }

  setFormValues(description:string, completed:boolean){
    this.formGroup.patchValue({
      description,
      completed
    })
  }


}


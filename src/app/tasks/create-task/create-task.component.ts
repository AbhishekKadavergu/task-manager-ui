import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  formGroup!: FormGroup;

  //snack-bar
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(formBuilder: FormBuilder, private taskSer: TaskService, private router: Router, private _snackBar: MatSnackBar) {
    this.formGroup = formBuilder.group({
      description: ['', Validators.requiredTrue],
      completed: false
    });
  }

  ngOnInit(): void {
    // this.setFormValues("Kill him", true)
  }



  async onFormSubmit() {
    console.log(this.formGroup.value)
    try {
      const task = await this.taskSer.createTask(this.formGroup.value)
      if (!task) {
        throw new Error("Something went wrong!")
      }
      console.log(task)
      this._snackBar.open('Task Created Successfully!', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5 * 1000
      });
      this.onResetClick()
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  onResetClick() {
    this.formGroup.reset()

  }

  goToHome() {
    this.router.navigateByUrl("home")
  }

  // setFormValues(description:string, completed:boolean){
  //   this.formGroup.patchValue({
  //     description,
  //     completed
  //   })
  // }


}

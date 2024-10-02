import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../models/task';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent {
  newTask: Task = { 
    title: '', 
    description: '', 
    status: 'pending',
    user_id: '', // Assuming you'll get this from your authentication service
    dueDate: null
  };
  createTaskError: string | null = null;
  constructor(private taskService: TaskService, private router: Router) { }

  createTask(form: NgForm) {
    // 1. Get user_id from your AuthService (you'll need to inject it)
    // Example: this.newTask.user_id = this.authService.getUserId(); 

    if (form.valid) {
      this.taskService.createTask(this.newTask).subscribe(
        (createdTask) => {
          console.log('Task created:', JSON.stringify(createdTask));
          // Optionally reset the form:
          this.newTask = { title: '', description: '', status: 'pending', user_id: '', dueDate: null };
          // Redirect to the task list or task details page
          this.router.navigate(['/tasks']); 
        },
        (error) => {
          console.error('Error creating task:', error);
          
        }
      );
    } else {
      this.createTaskError = 'Please fill in all required fields correctly.';
    }
  }
}
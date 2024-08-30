import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../models/task';
import { Router } from '@angular/router';

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

  constructor(private taskService: TaskService, private router: Router) { }

  createTask() {
    // 1. Get user_id from your AuthService (you'll need to inject it)
    // Example: this.newTask.user_id = this.authService.getUserId(); 

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
        // Handle errors appropriately, e.g., display an error message to the user
      }
    );
  }
}
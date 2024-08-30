import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  taskId: string = '';
  task: Task = { title: '', description: '', status: '', dueDate: null }; // Initialize with default values

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskId = params.get('id') || ''; 
      this.fetchTask();
    });
  }

  fetchTask() {
    this.taskService.getTask(this.taskId).subscribe(
      (task) => {
        this.task = task; 
      },
      (error) => {
        console.error('Error fetching task:', error);
        // Handle error, e.g., display an error message
      }
    );
  }

  updateTask() {
    this.taskService.updateTask(this.task).subscribe(
      (updatedTask) => {
        console.log('Task updated:', updatedTask);
        this.router.navigate(['/tasks']); // Redirect after update
      },
      (error) => {
        console.error('Error updating task:', error);
        // Handle error, e.g., display an error message
      }
    );
  }
}
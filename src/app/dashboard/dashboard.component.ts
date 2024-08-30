import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  taskSummary = {
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(
      tasks => {
        this.tasks = tasks.sort((a, b) => {
          // Make sure dueDate is a valid Date object before comparing
          const dateA = a.dueDate ? new Date(a.dueDate) : new Date(0); 
          const dateB = b.dueDate ? new Date(b.dueDate) : new Date(0);
          return dateA.getTime() - dateB.getTime(); 
        });
        this.calculateTaskSummary();
      },
      error => {
        console.error('Error fetching tasks:', error);
        // Handle error, e.g., display an error message
      }
    );
  }

  calculateTaskSummary() {
    this.taskSummary.total = this.tasks.length;
    this.taskSummary.pending = this.tasks.filter(task => task.status === 'pending').length;
    this.taskSummary.inProgress = this.tasks.filter(task => task.status === 'in_progress').length;
    this.taskSummary.completed = this.tasks.filter(task => task.status === 'completed').length;
  }
}

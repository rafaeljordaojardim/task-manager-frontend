import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../models/task';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; 
import { NotificationService } from '../notification-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks : Task[] = [];
  selectedStatus: string = 'All'; 
  selectedSort: string = 'DueDateAsc';

  constructor(
    private taskService: TaskService, 
    private authService: AuthService, 
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this.scheduleNotifications(); 
    this.notificationService.loadNotificationPreference();
  }

  scheduleNotifications() {
   setInterval(() => {
      this.checkDueTasks();
    }, 10000); // Check every minute
  }

  checkDueTasks() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      const now = new Date();
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

      tasks.forEach(task => {
        const dueDate = new Date(task.dueDate as unknown as string);
        const timeUntilDue = dueDate.getTime() - now.getTime();

        if (timeUntilDue < oneDay && timeUntilDue > 0 && task.status !== 'completed') {
          // Task is due within 24 hours and not completed
          this.showNotification('Task Due Soon', `${task.title} is due soon!`);
        } else if (timeUntilDue < 0 && task.status !== 'completed') {
          // Task is overdue and not completed
          this.showNotification('Task Overdue', `${task.title} is overdue!`);
        }
      });
    });
  }

  showNotification(title: string, body: string) {
    if (this.notificationService.areNotificationsEnabled()) {
      this.notificationService.showWarning(body, title);
    }
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    return this.authService.logout();
  }

  editTask(task: Task) {
    this.router.navigate(['/edit', task.id]); 
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.getTasks();
    });
  }

  applyFiltersAndSorting() {
    console.log(this.tasks);
    console.log(this.selectedStatus );
    this.filteredTasks = this.tasks.filter(task => {
      console.log(task);
      if (this.selectedStatus != 'All' && task.status !== this.selectedStatus) {
        return false;
      }
      return true;
    });

    // Sort the filtered tasks
    this.filteredTasks.sort((a, b) => {
      if (this.selectedSort === 'DueDateAsc') {
        return new Date(a.dueDate as unknown as string).getTime() - new Date(b.dueDate as unknown as string).getTime();
      } else if (this.selectedSort === 'DueDateDesc') {
        return new Date(b.dueDate as unknown as string).getTime() - new Date(a.dueDate as unknown as string).getTime();
      } else if (this.selectedSort === 'StatusAsc') {
        return a.status.localeCompare(b.status);
      } else {
        return b.status.localeCompare(a.status);
      }
    });
  }

  // Event handlers for filter and sort options (add these to your template)
  onStatusChange(event: any) {
    this.selectedStatus = event.target.value;
    this.applyFiltersAndSorting();
  }

  onSortChange(event: any) {
    this.selectedSort = event.target.value;
    this.applyFiltersAndSorting();
  }
}

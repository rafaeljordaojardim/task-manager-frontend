import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './models/task';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks'; // Your Flask API URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTask(taskId: string): Observable<Task> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAccessToken()}`
    });
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.get<Task>(url, { headers });
  }

  getTasks(): Observable<Task[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAccessToken()}`
    });
    return this.http.get<Task[]>(this.apiUrl, { headers });
  }

  createTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAccessToken()}`
    });
    return this.http.post<Task>(this.apiUrl, task, { headers });
  }

  updateTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAccessToken()}`
    });
    const url = `${this.apiUrl}/${task.id}`; // Assuming your API uses _id for task IDs
    return this.http.put<Task>(url, task, { headers });
  }

  deleteTask(taskId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAccessToken()}`
    });
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete(url, { headers });
  }
}
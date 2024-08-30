import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api'; // Your Flask API URL

  constructor(private http: HttpClient) {}

  signup(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user).pipe(
      tap(response => {
        console.log('Signup successful:', response);
      }),
      catchError(this.handleError)
    );
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        console.log('Login successful:', response);
        localStorage.setItem('accessToken', (response as { access_token: string;}).access_token);
        localStorage.setItem('username', (response as { user: string;}).user);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    // Redirect to login after logout
    window.location.href = '/login';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error.error || 'Server error');
  }
}
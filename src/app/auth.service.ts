import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './models/user';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Your Flask API URL
  private refreshTokenTimeout: any;
  constructor(private http: HttpClient, private router: Router) {}

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
        this.setTokens(response as { access_token: string; refresh_token: string });
        localStorage.setItem('username', (response as { user: string;}).user);
        this.scheduleRefreshToken();
        this.router.navigate(['/tasks']); 
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.removeTokens();
    localStorage.removeItem('username');
    // Redirect to login after logout
    clearTimeout(this.refreshTokenTimeout);//
    window.location.href = '/login';
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  getUsername(): string | null {
    const token = this.getAccessToken();
    if (!token) {
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.username;
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return !!this.getAccessToken();
  }

  private setTokens(tokens: { access_token: string, refresh_token: string }): void {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }

  private setAccessToken(tokens: { access_token: string, refresh_token: string }): void {
    localStorage.setItem('access_token', tokens.access_token);
  }

  private removeTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  private scheduleRefreshToken(): void {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return;
    }

    // Assuming your refresh token expires in 14 minutes (adjust as needed)
    const refreshInterval = 144000; // Refresh 5 seconds before expiry

    this.refreshTokenTimeout = setTimeout(() => {
      this.refreshToken().subscribe(
        () => {
          console.log('Token refreshed successfully!');
          this.scheduleRefreshToken(); // Schedule the next refresh
        },
        error => {
          console.error('Error refreshing token:', error);
          this.logout(); // Log out if refresh fails
        }
      );
    }, refreshInterval);
  }

  private refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError('No refresh token found');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${refreshToken}`
    });

    return this.http.post(`${this.apiUrl}/refresh`, {  }, { headers }).pipe(
      tap((tokens: any) => this.setAccessToken(tokens)),
      catchError(error => {
        this.logout();
        return throwError(error);
      })
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error.error || 'Server error');
  }
}
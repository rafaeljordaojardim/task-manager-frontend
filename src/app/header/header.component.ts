import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Assuming you have an AuthService

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Implement isLoggedIn() in AuthService
  }

  logout(): void {
    this.authService.logout(); // Implement logout() in AuthService
  }
}

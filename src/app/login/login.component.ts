import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tasks']);
    }
  }

  onSubmit(): void {
    this.authService.login(this.user).subscribe(
      () => {
        this.router.navigate(['/tasks']);
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  }


}

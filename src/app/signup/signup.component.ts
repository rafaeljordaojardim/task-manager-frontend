import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user: User = { 
    username: '', 
    password: '' 
  };
  signupError: string | null = null;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm): void {
    if (form.valid) { // Check if the form is valid
      this.authService.signup(this.user).subscribe(
        () => {
          // Signup successful, redirect to login or another page
          this.router.navigate(['/login']); 
        },
        error => {
          this.signupError = error; // Handle signup errors
        }
      );
    } else {
      // Handle form validation errors (e.g., display error messages)
      this.signupError = 'Please fill in all required fields correctly.';
    }
  }
}

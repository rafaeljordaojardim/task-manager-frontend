import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = { username: '', password: '' };
  errorMessage: string = '';
  signinError: string | null = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tasks']);
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) { // Check if the form is valid
      this.authService.login(this.user).subscribe(
        () => {
          this.router.navigate(['/tasks']);
        },
        error => {
          this.signinError = error; 
        }
      )   
    } else {
        // Handle form validation errors (e.g., display error messages)
        this.signinError = 'Please fill in all required fields correctly.';
      }
  }


}

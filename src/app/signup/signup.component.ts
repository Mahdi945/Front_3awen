import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  private apiUrl = 'http://localhost:3000/api/users/register'; 
  successMessage: string = ''; 
  errorMessage: string = ''; 

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Method for registration via the form
  onRegister(form: NgForm) {
    if (form.valid) {
      const userData = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        password: form.value.password,
        phone: form.value.phone,
        city: form.value.city,
      };

      // Send registration data to the server
      this.http.post(this.apiUrl, userData).subscribe({
        next: (response) => {
          this.successMessage = 'Registration successful! Please check your email to activate your account.';
          this.errorMessage = ''; // Reset error message
          form.resetForm(); // Reset the form after successful registration
        },
        error: (error) => {
          console.error('Error during user registration', error);
          if (error.status === 409) {
            this.errorMessage = 'This email is already in use.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        }
      });
    } else {
      console.log('Invalid form');
    }
  }
}
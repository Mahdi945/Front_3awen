import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private http: HttpClient) {}

  sendContactEmail() {
    const contactData = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    };

    this.http.post('http://localhost:3000/api/users/contact', contactData).subscribe({
      next: (response: any) => {
        this.successMessage = 'Your message has been sent successfully!';
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          location.reload(); // Refresh the page after 5 seconds
        }, 5000); // Hide the message after 5 seconds
      },
      error: (error: any) => {
        this.errorMessage = 'There was an error sending your message. Please try again.';
        this.showErrorMessage = true;
        setTimeout(() => {
          this.showErrorMessage = false;
          location.reload(); // Refresh the page after 5 seconds
        }, 5000); // Hide the message after 5 seconds
      }
    });
  }
}
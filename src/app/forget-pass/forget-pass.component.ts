import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent {
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.value.email;
      this.errorMessage = '';

      // Call API to send password reset email
      this.http.post<any>('http://localhost:3000/api/users/forgot-password', { email })
        .subscribe(
          response => {
            console.log('Email de réinitialisation envoyé', response);
            this.successMessage = 'Un lien de réinitialisation a été envoyé à votre adresse email.';
          },
          error => {
            console.error('Erreur lors de l\'envoi de l\'email', error);
            this.errorMessage = 'Une erreur est survenue lors de l\'envoi de l\'email. Veuillez réessayer.';
          }
        );
    } else {
      this.errorMessage = 'Veuillez entrer une adresse email valide.';
    }
  }
}

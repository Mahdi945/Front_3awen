import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  private apiUrl = 'http://localhost:3000/api/users/register'; // L'URL de l'API
  successMessage: string = ''; // Variable pour stocker le message de succès
  errorMessage: string = ''; // Variable pour stocker le message d'erreur

  constructor(private http: HttpClient) {}

  onRegister(form: NgForm) {
    if (form.valid) {
      const userData = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
        password: form.value.password, // Envoyer le mot de passe en clair
        phone: form.value.phone,
        city: form.value.city
      };

      // Envoyer les données au serveur
      this.http.post(this.apiUrl, userData).subscribe({
        next: (response) => {
          // Afficher un message de confirmation
          this.successMessage = 'Inscription réussie ! Veuillez vérifier votre email pour activer votre compte.';
          this.errorMessage = ''; // Réinitialiser le message d'erreur
        },
        error: (error) => {
          console.error('Erreur lors de l\'inscription de l\'utilisateur', error);
          if (error.status === 409) {
            this.errorMessage = 'Cet email est déjà utilisé.';
          } else {
            this.errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
          }
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }
}
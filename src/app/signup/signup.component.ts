import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Pour la redirection

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
    private router: Router  // Injecter Router pour redirection
  ) {}

  // Méthode pour l'inscription via le formulaire classique
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

      // Envoyer les données d'inscription au serveur
      this.http.post(this.apiUrl, userData).subscribe({
        next: (response) => {
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
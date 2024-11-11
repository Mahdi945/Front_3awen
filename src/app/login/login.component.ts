import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string = ''; // Variable pour stocker le message d'erreur

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  onLogin(form: NgForm) {
    if (form.valid) {
      const credentials = {
        email: form.value.email,
        pass: form.value.pass
      };

      // Log the credentials to verify the data being sent
      console.log('Credentials:', credentials);

      // Réinitialisation du message d'erreur avant la tentative de connexion
      this.errorMessage = '';

      // Appel à l'API de login
      this.http.post<any>('http://localhost:3000/api/users/login', credentials)
        .subscribe(
          response => {
            console.log('Connexion réussie', response);
            this.authService.login(response.token, response.user); // Store the token and user info
            this.router.navigate(['/accueil']); // Redirection après connexion réussie
          },
          error => {
            console.error('Erreur lors de la connexion', error);
            // Afficher un message d'erreur à l'utilisateur si la connexion échoue
            if (error.status === 400) {
              this.errorMessage = 'Adresse e-mail ou mot de passe incorrect.';
            } else if (error.status === 401) {
              this.errorMessage = 'Requête incorrecte. Veuillez vérifier vos informations.';
            } else if (error.status === 403) {
              this.errorMessage = 'Veuillez vérifier votre email avant de vous connecter.';
            } else if (error.status === 404) {
              this.errorMessage = 'Utilisateur non trouvé. Veuillez vérifier vos informations.';
            } else {
              this.errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
            }
          }
        );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs.';
    }
  }
}
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login'; // Import des services sociaux

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  private apiUrl = 'http://localhost:3000/api/users/register'; // URL de l'API pour l'inscription classique
  successMessage: string = ''; // Variable pour le message de succès
  errorMessage: string = ''; // Variable pour le message d'erreur

  user: SocialUser | null = null; // Stocker les informations de l'utilisateur social
  loggedIn: boolean = false; // Vérifier si l'utilisateur est connecté via OAuth

  constructor(
    private http: HttpClient,
    private authService: SocialAuthService // Service pour l'authentification sociale
  ) {
    // Récupérer l'état de connexion sociale
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  // Méthode pour l'inscription classique via formulaire
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

  // Méthode pour l'inscription via Google
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      // Inscrire l'utilisateur avec les données obtenues via Google
      const googleUserData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: null, // Aucun mot de passe puisque l'authentification est via Google
        phone: null, // Optionnel
        city: null // Optionnel
      };

      // Envoyer les données de l'utilisateur au serveur pour l'inscription via Google
      this.http.post(this.apiUrl, googleUserData).subscribe({
        next: (response) => {
          this.successMessage = 'Inscription via Google réussie ! Veuillez vérifier votre email pour activer votre compte.';
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Erreur lors de l\'inscription avec Google', error);
          this.errorMessage = 'Une erreur est survenue avec Google. Veuillez réessayer plus tard.';
        }
      });
    }).catch((error) => {
      console.error('Erreur lors de la connexion avec Google', error);
    });
  }

  // Méthode pour déconnecter l'utilisateur
  signOut(): void {
    this.authService.signOut();
    this.loggedIn = false;
    this.user = null;
  }
}

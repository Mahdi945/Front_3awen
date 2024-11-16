import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login'; 
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

  user: SocialUser | null = null; 
  loggedIn: boolean = false;

  // Google Login-related fields
  googleUserData: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    isGoogleUser: false // Indicate if the user signed up via Google
  };

  constructor(
    private http: HttpClient,
    private authService: SocialAuthService,
    private router: Router  // Injecter Router pour redirection
  ) {
    // Écouter les changements d'état d'authentification
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (user) {
        this.googleUserData.firstName = user.firstName || '';
        this.googleUserData.lastName = user.lastName || '';
        this.googleUserData.email = user.email || '';
      }
    });
  }

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
        isGoogleUser: false // Indiquer que l'utilisateur n'est pas un utilisateur Google
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
      // Remplir les données de l'utilisateur Google
      this.googleUserData.firstName = userData.firstName || '';
      this.googleUserData.lastName = userData.lastName || '';
      this.googleUserData.email = userData.email || '';
      this.googleUserData.isGoogleUser = true; // Marquer l'utilisateur comme un utilisateur Google

      // Envoyer les données à votre backend (vérifiez si l'utilisateur existe déjà ou inscrivez un nouvel utilisateur)
      this.http.post(this.apiUrl, this.googleUserData).subscribe({
        next: (response) => {
          this.successMessage = 'Inscription via Google réussie ! Vous serez redirigé vers la page de connexion.';
          this.errorMessage = '';
          this.router.navigate(['/login']); // Rediriger vers la page de connexion après une inscription réussie
        },
        error: (error) => {
          console.error('Erreur avec Google Signup', error);
          this.errorMessage = 'Une erreur est survenue avec Google. Veuillez réessayer plus tard.';
        }
      });
    }).catch((error) => {
      console.error('Erreur lors de la connexion avec Google', error);
    });
  }

  // Méthode pour se déconnecter
  signOut(): void {
    this.authService.signOut();
    this.loggedIn = false;
    this.user = null;
  }
}
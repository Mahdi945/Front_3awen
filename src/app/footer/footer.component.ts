import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Pour les appels HTTP
import { Router } from '@angular/router';  // Pour la redirection

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  email: string = '';  // Pour stocker l'email de l'utilisateur
  successMessage: string = '';  // Message de succès après l'abonnement
  errorMessage: string = '';    // Message d'erreur en cas de problème
  showSuccessModal: boolean = false; // Pour contrôler l'affichage du modal

  private apiUrl = 'http://localhost:3000/api/newsletter/subscribe';  // L'URL de votre API pour gérer l'abonnement

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode appelée lors de la soumission du formulaire
  subscribeToNewsletter() {
    if (this.email) {
      const subscriberData = { email: this.email };

      // Envoi des données à l'API backend pour l'abonnement
      this.http.post(this.apiUrl, subscriberData).subscribe({
        next: (response) => {
          this.successMessage = 'Vous êtes maintenant abonné à notre newsletter !';
          this.errorMessage = ''; // Réinitialiser le message d'erreur
          this.showSuccessModal = true; // Afficher le modal de succès
          setTimeout(() => {
            this.showSuccessModal = false;
            this.router.navigate(['/']); // Rediriger vers la page d'accueil après 3 secondes
          }, 3000); // Masquer le modal après 3 secondes
        },
        error: (error) => {
          console.error('Erreur lors de l\'abonnement', error);
          if (error.status === 400 && error.error.message === 'Cet email est déjà abonné.') {
            this.errorMessage = 'Cet email est déjà abonné.';
          } else {
            this.errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
          }
        }
      });
    }
  }
}
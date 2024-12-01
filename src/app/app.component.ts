import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showNavbar: boolean = true;
  isRatingPanelVisible: boolean = false; // État du panneau de notation
  isSubmitted: boolean = false; // État pour afficher le message de confirmation
  rating: number | null = null; // Note donnée par l'utilisateur
  feedback: string = ''; // Commentaire donné par l'utilisateur

  // API pour envoyer les avis
  private ratingApiUrl = 'http://localhost:3000/api/ratings/add';

  constructor(private router: Router, private http: HttpClient) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = event.url !== '/accueil';
      }
    });
  }

  // Basculer la visibilité du panneau de notation
  toggleRatingPanel(): void {
    this.isRatingPanelVisible = !this.isRatingPanelVisible;
    this.isSubmitted = false; // Réinitialiser l'état de soumission
  }

  // Soumettre la note
  submitRating(): void {
    if (this.rating) {
      const ratingData = {
        rating: this.rating,
        comment: this.feedback,
        type: 'siteRating' // Définir le type de notation comme siteRating
      };

      // Envoyer les données au backend
      this.http.post(this.ratingApiUrl, ratingData).subscribe({
        next: (response) => {
          console.log('Réponse du serveur :', response);

          // Afficher le message de confirmation
          this.isSubmitted = true;

          // Réinitialiser les champs et masquer le panneau
          this.rating = null;
          this.feedback = '';
          this.isRatingPanelVisible = false;
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi de la note :', error);
          alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
      });
    } else {
      alert('Veuillez sélectionner une note avant de soumettre.');
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Importer HttpClient

@Component({
  selector: 'app-donation-success',
  templateUrl: './donation-success.component.html',
  styleUrls: ['./donation-success.component.scss']
})
export class DonationSuccessComponent implements OnInit {
  sessionId: string | null = null;
  eventId: string | null = null;
  donationAmount: number = 0; // Montant de la donation
  successMessage: string = 'Payment successful! Thank you for your generosity.';
  rating: number = 0;
  comment: string = '';
  showThanksPopup: boolean = false; // Variable pour afficher le popup

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient, // Injecter HttpClient
    private router: Router // Injecter Router
  ) {}

  ngOnInit(): void {
    // Récupération de session_id et event_id depuis les paramètres de l'URL
    this.activatedRoute.queryParams.subscribe(params => {
      this.sessionId = params['session_id'];
      this.eventId = params['event_id']; // Récupération de event_id
      this.donationAmount = parseFloat(params['donation_amount']) || 0; // Récupérer le montant du don

      if (this.sessionId) {
        console.log('Session ID reçu :', this.sessionId);
      } else {
        console.warn('Aucun session_id trouvé dans l\'URL.');
      }

      if (this.eventId) {
        console.log('Event ID reçu :', this.eventId);
      } else {
        console.warn('Aucun event_id trouvé dans l\'URL.');
      }

      // Si eventId et donationAmount sont disponibles, appeler l'API
      if (this.eventId && this.donationAmount > 0) {
        this.updateEventRaisedAmount();
      }
    });
  }

  // Fonction pour appeler l'API et mettre à jour l'événement
  updateEventRaisedAmount(): void {
    const apiUrl = 'http://localhost:3000/api/events/updateRaisedAmount'; // URL de l'API

    // Appel de l'API pour mettre à jour le montant levé
    this.http.put(apiUrl, { eventId: this.eventId, donationAmount: this.donationAmount })
      .subscribe(
        (response) => {
          console.log('Réponse de la mise à jour:', response);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour:', error);
        }
      );
  }

  // Fonction pour définir la note
  setRating(rating: number): void {
    this.rating = rating;
  }

  // Fonction pour soumettre la note
  submitRating(): void {
    const apiUrl = 'http://localhost:3000/api/ratings/add'; // URL de l'API pour ajouter une note

    // Appel de l'API pour ajouter la note
    this.http.post(apiUrl, { rating: this.rating, comment: this.comment, type: 'eventRating', eventId: this.eventId })
      .subscribe(
        (response) => {
          console.log('Réponse de l\'ajout de la note:', response);
          this.showThanksPopup = true; // Afficher le popup de remerciement

          // Rediriger vers l'accueil après 1 minute
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 8000); // 60000 ms = 1 minute
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la note:', error);
        }
      );
  }

  // Fonction pour fermer le popup de remerciement
  closeThanksPopup(): void {
    this.showThanksPopup = false;
  }
}
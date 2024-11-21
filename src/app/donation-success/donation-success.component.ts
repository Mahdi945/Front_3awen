import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  successMessage: string = 'Paiement réussi ! Merci pour votre générosité.';

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient // Injecter HttpClient
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

    // Redirection automatique vers la page d'accueil après 5 secondes
    setTimeout(() => {
      window.location.href = '/accueil'; 
    }, 5000); // 5000 millisecondes = 5 secondes
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
}

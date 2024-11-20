import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donation-success',
  templateUrl: './donation-success.component.html',
  styleUrls: ['./donation-success.component.scss']
})
export class DonationSuccessComponent implements OnInit {
  sessionId: string | null = null;
  eventId: string | null = null; // Ajout de eventId
  successMessage: string = 'Paiement réussi ! Merci pour votre générosité.';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupération de session_id et event_id depuis les paramètres de l'URL
    this.activatedRoute.queryParams.subscribe(params => {
      this.sessionId = params['session_id'];
      this.eventId = params['event_id']; // Récupération de event_id
      if (this.sessionId) {
        console.log('Session ID reçu :', this.sessionId);
        // Si nécessaire, vous pouvez utiliser sessionId pour récupérer des détails supplémentaires via une API.
      } else {
        console.warn('Aucun session_id trouvé dans l\'URL.');
      }
      if (this.eventId) {
        console.log('Event ID reçu :', this.eventId);
      } else {
        console.warn('Aucun event_id trouvé dans l\'URL.');
      }
    });

    // Redirection automatique vers la page d'accueil après 5 secondes
    setTimeout(() => {
      // Redirection vers la page d'accueil
      window.location.href = '/accueil'; 
    }, 5000); // 5000 millisecondes = 5 secondes
  }
}

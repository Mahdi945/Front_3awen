import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service'; // Import the AuthService
import { loadStripe } from '@stripe/stripe-js'; // Import the Stripe library

interface Event {
  _id: string;
  nomOrganisateur: string;
  emailOrganisateur: string;
  description: string;
  titre: string;
  volontaires: number;
  date: string;
  heure: string;
  lieu: string;
  eventType: string; // Type de l'événement (service ou fundraising)
  goal?: number; // Pour les événements de fundraising
  deadline?: string; // Pour les événements de fundraising
  isApproved: boolean;
  eventImage: string;
}

@Component({
  selector: 'app-participate-event',
  templateUrl: './participate-event.component.html',
  styleUrls: ['./participate-event.component.scss']
})
export class ParticipateEventComponent implements OnInit {
  serviceEvents: Event[] = [];
  fundraisingEvents: Event[] = [];
  filteredServiceEvents: Event[] = [];
  filteredFundraisingEvents: Event[] = [];
  searchQuery: string = '';
  showModal: boolean = false;
  showEventDetailsModal: boolean = false;
  showDonationModal: boolean = false;
  modalContent: any = {};
  modalMessage: string = '';
  donationAmount: number = 0;
  selectedEvent: Event | null = null;
  visibleEventsCountService: number = 3;
  visibleEventsCountFundraising: number = 3;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<Event[]>('http://localhost:3000/api/events/approvedServices').subscribe({
      next: (data) => {
        this.serviceEvents = data;
        this.updateFilteredEvents();
      },
      error: (error) => console.error('Erreur lors du chargement des événements de service:', error),
    });

    this.http.get<Event[]>('http://localhost:3000/api/events/approvedFundraising').subscribe({
      next: (data) => {
        this.fundraisingEvents = data;
        this.updateFilteredEvents();
      },
      error: (error) => console.error('Erreur lors du chargement des événements de fundraising:', error),
    });
  }

  updateFilteredEvents() {
    this.filteredServiceEvents = this.serviceEvents.slice(0, this.visibleEventsCountService);
    this.filteredFundraisingEvents = this.fundraisingEvents.slice(0, this.visibleEventsCountFundraising);
  }

  loadMoreEvents(eventType: string) {
    if (eventType === 'service') {
      this.visibleEventsCountService += 3;
    } else if (eventType === 'fundraising') {
      this.visibleEventsCountFundraising += 3;
    }
    this.updateFilteredEvents();
  }

  searchEvents() {
    const query = this.searchQuery.toLowerCase();
    this.http.get<Event[]>(`http://localhost:3000/api/events/search?query=${query}`).subscribe({
      next: (events) => {
        // Filter events into service and fundraising categories
        this.filteredServiceEvents = events.filter(event => event.eventType === 'service');
        this.filteredFundraisingEvents = events.filter(event => event.eventType === 'fundraising');
      },
      error: (error) => console.error('Erreur lors de la recherche des événements:', error),
    });
  }

  participate(event: Event) {
    const userEmail = this.authService.getUserEmail();
    if (!userEmail) {
      console.error('Utilisateur non connecté. Redirection vers la page de connexion.');
      return;
    }

    const participationData = { email: userEmail };
    this.http.put(`http://localhost:3000/api/events/${event._id}/participate`, participationData).subscribe({
      next: () => {
        this.showModal = true;
        this.modalMessage = 'Thank you for participating! The organizer will contact you soon.';
        setTimeout(() => {
          this.showModal = false;
          this.loadEvents();
        }, 5000);
      },
      error: (error) => console.error('Erreur lors de la participation à l\'événement:', error),
    });
  }

  showEventDetails(event: Event) {
    this.modalContent = {
      nomOrganisateur: event.nomOrganisateur,
      emailOrganisateur: event.emailOrganisateur,
      description: event.description,
    };
    this.showEventDetailsModal = true;
  }

  openDonationModal(event: Event) {
    this.selectedEvent = event;
    this.showDonationModal = true;
  }

  async donateNow(event: Event, donationAmount: number) {
    const userEmail = this.authService.getUserEmail();
    if (!userEmail) {
      console.error('Utilisateur non connecté. Redirection vers la page de connexion.');
      return;
    }

    const stripe = await loadStripe('pk_test_51QLZyZKtG1o9vy1VQ3Y7Ebb4VKSmXVB4zfGFPxQ93WOK8OLRRrZrnHqBQySjmveqItXARpfpQgcYF7JTUo5UwqoX00SBXeknwd');

    this.http.post<{ sessionId: string }>('http://localhost:3000/api/checkoutSession', {
      items: [{ name: event.titre, amount: donationAmount * 100, quantity: 1 }],
      eventId: event._id, // Inclure l'ID de l'événement pour tracer
    }).subscribe({
      next: (response) => {
        stripe?.redirectToCheckout({ sessionId: response.sessionId }).then((result) => {
          if (result.error) {
            console.error('Erreur lors de la redirection vers Stripe:', result.error.message);
          }
        });
      },
      error: (error) => console.error('Erreur lors de la création de la session Stripe:', error),
    });
  }

  // Appeler l'API backend pour mettre à jour l'objectif après un don réussi
  updateEventGoal(eventId: string, donationAmount: number) {
    this.http.put<{ remainingGoal: number }>(`http://localhost:3000/api/events/${eventId}/updateGoal`, {
      eventId,
      donationAmount,
    }).subscribe({
      next: (response) => {
        const event = this.fundraisingEvents.find((e) => e._id === eventId);
        if (event && event.goal !== undefined) {
          event.goal = response.remainingGoal; // Mettre à jour l'objectif de l'événement
        }
      },
      error: (error) => console.error('Erreur lors de la mise à jour de l\'objectif :', error),
    });
  }

  proceedWithDonation() {
    if (this.selectedEvent && this.donationAmount > 0) {
      this.donateNow(this.selectedEvent, this.donationAmount);
      this.showDonationModal = false; // Fermer le modal après validation
    } else {
      console.error('Montant du don invalide ou événement non sélectionné.');
    }
  }
}
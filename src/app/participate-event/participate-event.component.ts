import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Event {
  _id: string;
  nomOrganisateur: string;
  titre: string;
  volontaires: number;
  date: string;
  heure: string;
  lieu: string;
  isApproved: boolean;
}

@Component({
  selector: 'app-participate-event',
  templateUrl: './participate-event.component.html',
  styleUrls: ['./participate-event.component.scss']
})
export class ParticipateEventComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  searchQuery: string = '';
  showModal: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<Event[]>('http://localhost:3000/api/events').subscribe({
      next: (data) => {
        this.events = data.filter(event => event.isApproved); // Filter events to show only approved ones
        this.filteredEvents = this.events;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements:', error);
      }
    });
  }

  searchEvents() {
    const query = this.searchQuery.toLowerCase();
    this.filteredEvents = this.events.filter(event =>
      event.titre.toLowerCase().includes(query) ||
      event.lieu.toLowerCase().includes(query)
    );
  }

  participate(event: Event) {
    this.http.put(`http://localhost:3000/api/events/${event._id}/participate`, {}).subscribe({
      next: () => {
        this.showModal = true; // Show the modal
        setTimeout(() => {
          this.showModal = false; // Hide the modal after 5 seconds
          this.loadEvents(); // Refresh the events
        }, 5000);
      },
      error: (error) => {
        console.error('Erreur lors de la participation à l\'événement:', error);
      }
    });
  }
}
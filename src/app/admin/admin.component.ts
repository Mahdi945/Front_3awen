import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Event {
  _id: string;
  nomOrganisateur: string;
  emailOrganisateur: string;
  titre: string;
  date: string;
  heure: string;
  lieu: string;
  description: string;
  volontaires: number;
  preuves: string[]; // Proof files array
  isApproved: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  events: Event[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<Event[]>('http://localhost:3000/api/events').subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements:', error);
      }
    });
  }

  approveEvent(eventId: string) {
    this.http.put(`http://localhost:3000/api/events/${eventId}/approve`, {}).subscribe({
      next: () => {
        this.loadEvents(); // Refresh the list after approval
      },
      error: (error) => {
        console.error('Erreur lors de l\'approbation de l\'événement:', error);
      }
    });
  }

  rejectEvent(eventId: string) {
    this.http.delete(`http://localhost:3000/api/events/${eventId}`).subscribe({
      next: () => {
        this.loadEvents(); // Refresh the list after rejection
      },
      error: (error) => {
        console.error('Erreur lors du refus de l\'événement:', error);
      }
    });
  }

  downloadProofs(eventId: string) {
    const url = `http://localhost:3000/api/events/${eventId}/downloadProofs`;
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `preuves_${eventId}.zip`; // Nom du fichier ZIP
        link.click();
      },
      (error) => console.error('Erreur lors du téléchargement des preuves:', error)
    );
  }
}
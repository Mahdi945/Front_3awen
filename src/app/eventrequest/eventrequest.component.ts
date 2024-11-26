import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Event {
  _id: string;
  nomOrganisateur: string;
  emailOrganisateur: string;
  titre: string;
  date?: string;
  heure?: string;
  lieu?: string;
  donateFor?: string;
  goal?: number;
  deadline?: string;
  volontaires?: number;
  description?: string;
  preuves: string[]; // Proof files array
  isApproved: boolean;
  eventImage: string; // Image field
}

@Component({
  selector: 'app-eventrequest',
  templateUrl: './eventrequest.component.html',
  styleUrls: ['./eventrequest.component.scss']
})
export class EventrequestComponent implements OnInit {
  serviceEvents: Event[] = [];
  fundraisingEvents: Event[] = [];
  dropdownOpen: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadServiceEvents();
    this.loadFundraisingEvents();
  }
 

toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
}

closeDropdown(): void {
    this.dropdownOpen = false;
}


  loadServiceEvents() {
    this.http.get<Event[]>('http://localhost:3000/api/events/service-events').subscribe({
      next: (data) => {
        this.serviceEvents = data;
      },
      error: (error) => {
        console.error('Error loading service events:', error);
      }
    });
  }

  loadFundraisingEvents() {
    this.http.get<Event[]>('http://localhost:3000/api/events/donation-events').subscribe({
      next: (data) => {
        this.fundraisingEvents = data;
      },
      error: (error) => {
        console.error('Error loading fundraising events:', error);
      }
    });
  }

  approveEvent(eventId: string) {
    this.http.put(`http://localhost:3000/api/events/${eventId}/approve`, {}).subscribe({
      next: () => {
        this.loadServiceEvents();
        this.loadFundraisingEvents();
      },
      error: (error) => {
        console.error('Error approving event:', error);
      }
    });
  }

  rejectEvent(eventId: string) {
    this.http.delete(`http://localhost:3000/api/events/${eventId}`, {}).subscribe({
      next: () => {
        this.loadServiceEvents();
        this.loadFundraisingEvents();
      },
      error: (error) => {
        console.error('Error rejecting event:', error);
      }
    });
  }
  downloadProofs(eventId: string) {
    const url = `http://localhost:3000/api/events/${eventId}/downloadProofs`;
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `preuves_${eventId}.zip`; // Download file with the event's ID
        link.click();
      },
      (error) => console.error('Erreur lors du téléchargement des preuves:', error)
    );
  }
  toggleImage(imageUrl: string) {
    window.open(imageUrl, '_blank'); // Opens the image in a new tab
  }
    
}

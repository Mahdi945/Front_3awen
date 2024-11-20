import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  serviceEvents: Event[] = [];
  fundraisingEvents: Event[] = [];
  approvedServiceEvents: Event[] = [];
  approvedFundraisingEvents: Event[] = [];
  users: User[] = [];
  displayedImageIndex: number | null = null; // Indique quelle ligne du tableau affiche une image
  showUpdateModal: boolean = false;
  selectedEvent: Event | null = null;
  selectedEventType: string | null = null;
  updateForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      titre: ['', Validators.required],
      date: [''],
      heure: [''],
      lieu: [''],
      volontaires: [0],
      description: [''],
      donateFor: [''],
      goal: [0],
      deadline: ['']
    });
  }

  ngOnInit() {
    this.loadServiceEvents();
    this.loadFundraisingEvents();
    this.loadApprovedServiceEvents();
    this.loadApprovedFundraisingEvents();
    this.loadUsers();
  }

  loadServiceEvents() {
    this.http.get<Event[]>('http://localhost:3000/api/events/service-events').subscribe({
      next: (data) => {
        this.serviceEvents = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements de service:', error);
      }
    });
  }

  loadFundraisingEvents() {
    this.http.get<Event[]>('http://localhost:3000/api/events/donation-events').subscribe({
      next: (data) => {
        this.fundraisingEvents = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements de collecte de fonds:', error);
      }
    });
  }

  loadApprovedServiceEvents() {
    this.http.get<Event[]>('http://localhost:3000/api/events/approvedServices').subscribe({
      next: (data) => {
        this.approvedServiceEvents = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements de service approuvés:', error);
      }
    });
  }

  loadApprovedFundraisingEvents() {
    this.http.get<Event[]>('http://localhost:3000/api/events/approvedFundraising').subscribe({
      next: (data) => {
        this.approvedFundraisingEvents = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements de collecte de fonds approuvés:', error);
      }
    });
  }

  loadUsers() {
    this.http.get<User[]>('http://localhost:3000/api/users/all').subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    });
  }

  deleteUser(userId: string) {
    this.http.delete(`http://localhost:3000/api/users/delete/${userId}`).subscribe({
      next: () => {
        this.loadUsers(); // Reload users after deletion
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
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
        console.error('Erreur lors de l\'approbation de l\'événement:', error);
      }
    });
  }

  rejectEvent(eventId: string) {
    this.http.delete(`http://localhost:3000/api/events/${eventId}`).subscribe({
      next: () => {
        this.loadServiceEvents();
        this.loadFundraisingEvents();
      },
      error: (error) => {
        console.error('Erreur lors du refus de l\'événement:', error);
      }
    });
  }

  deleteApprovedEvent(eventId: string) {
    console.log(`Deleting approved event with ID: ${eventId}`);
    this.http.delete(`http://localhost:3000/api/events/approved/${eventId}`).subscribe({
      next: () => {
        console.log(`Approved event with ID: ${eventId} deleted successfully`);
        this.loadApprovedServiceEvents();
        this.loadApprovedFundraisingEvents();
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'événement approuvé:', error);
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

  toggleImage(imageUrl: string) {
    window.open(imageUrl, '_blank');
  }

  openUpdateModal(event: Event, eventType: string) {
    this.selectedEvent = event;
    this.selectedEventType = eventType;
    this.updateForm.patchValue(event);
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
    this.selectedEvent = null;
    this.selectedEventType = null;
  }

  updateEvent() {
    if (this.updateForm.invalid || !this.selectedEvent) {
      return;
    }

    const updatedEvent = this.updateForm.value;
    const eventId = this.selectedEvent._id;
    const updateUrl = this.selectedEventType === 'fundraising' ? 
      `http://localhost:3000/api/events/updateFundraising/${eventId}` : 
      `http://localhost:3000/api/events/updateService/${eventId}`;

    this.http.put(updateUrl, updatedEvent).subscribe({
      next: () => {
        this.loadApprovedServiceEvents();
        this.loadApprovedFundraisingEvents();
        this.closeUpdateModal();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'événement:', error);
      }
    });
  }
}
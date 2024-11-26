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
  preuves: string[];
  isApproved: boolean;
  eventImage: string;
}

@Component({
  selector: 'app-eventmanagement',
  templateUrl: './eventmanagement.component.html',
  styleUrls: ['./eventmanagement.component.scss']
})
export class EventmanagementComponent implements OnInit {
  approvedServiceEvents: Event[] = [];
  approvedFundraisingEvents: Event[] = [];
  filteredServiceEvents: Event[] = [];
  filteredFundraisingEvents: Event[] = [];
  showUpdateModal: boolean = false;
  selectedEvent: Event | null = null;
  selectedEventType: string | null = null;
  updateForm: FormGroup;
  searchQuery: string = '';

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
    this.loadApprovedServiceEvents();
    this.loadApprovedFundraisingEvents();
  }

  loadApprovedServiceEvents() {
    this.http.get<Event[]>('http://localhost:3000/api/events/approvedServices').subscribe({
      next: (data) => {
        this.approvedServiceEvents = data;
        this.filteredServiceEvents = data;
      },
      error: (err) => {
        console.error('Error fetching service events:', err);
      }
    });
  }

  loadApprovedFundraisingEvents() {
    this.http.get<Event[]>('http://localhost:3000/api/events/approvedFundraising').subscribe({
      next: (data) => {
        this.approvedFundraisingEvents = data;
        this.filteredFundraisingEvents = data;
      },
      error: (err) => {
        console.error('Error fetching fundraising events:', err);
      }
    });
  }

  searchEvents() {
    const query = this.searchQuery.toLowerCase();
    this.filteredServiceEvents = this.approvedServiceEvents.filter(event =>
      event.titre.toLowerCase().includes(query) ||
      event.nomOrganisateur.toLowerCase().includes(query) ||
      event.lieu?.toLowerCase().includes(query)
    );
    this.filteredFundraisingEvents = this.approvedFundraisingEvents.filter(event =>
      event.titre.toLowerCase().includes(query) ||
      event.nomOrganisateur.toLowerCase().includes(query) ||
      event.lieu?.toLowerCase().includes(query)
    );
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

  deleteApprovedEvent(eventId: string) {
    this.http.delete(`http://localhost:3000/api/events/approved/${eventId}`).subscribe({
      next: () => {
        console.log('Event deleted successfully');
        this.loadApprovedServiceEvents();
        this.loadApprovedFundraisingEvents();
      },
      error: (err) => {
        console.error('Error deleting event:', err);
      }
    });
  }
}
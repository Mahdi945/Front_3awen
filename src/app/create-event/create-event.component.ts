import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import the AuthService

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  evenement = {
    nomOrganisateur: '',
    emailOrganisateur: '',
    titre: '',
    date: '',
    heure: '',
    lieu: '',
    description: '',
    volontaires: 0,
    preuves: [] as File[],
    id_user_organisateur: '' // Add userId to the event data
  };

  selectedFileNames: string[] = [];
  isModalOpen: boolean = false;
  showSuccessMessage: boolean = false;
  exactCoordinatesEntered: boolean = false;
  latitude: number = 51.678418;
  longitude: number = 7.809007;
  zoom: number = 8;
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  markerPosition: google.maps.LatLngLiteral = { lat: this.latitude, lng: this.longitude };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Get the user ID from the AuthService
    const userId = this.authService.getUserId();
    if (userId) {
      this.evenement.id_user_organisateur = userId;
    } else {
      // Handle the case where userId is null (e.g., redirect to login)
      console.error('User ID is null. Redirecting to login.');
      this.router.navigate(['/login']);
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.selectedFileNames = [];
    this.evenement.preuves = [];
    for (let i = 0; i < files.length; i++) {
      this.evenement.preuves.push(files[i]);
      this.selectedFileNames.push(files[i].name);
    }
  }

  clearFileSelection() {
    this.selectedFileNames = [];
    this.evenement.preuves = [];
    const fileInput = document.getElementById('event-proof') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('nomOrganisateur', this.evenement.nomOrganisateur);
    formData.append('emailOrganisateur', this.evenement.emailOrganisateur);
    formData.append('titre', this.evenement.titre);
    formData.append('date', this.evenement.date);
    formData.append('heure', this.evenement.heure);
    formData.append('lieu', this.evenement.lieu);
    formData.append('description', this.evenement.description);
    formData.append('volontaires', this.evenement.volontaires.toString());
    formData.append('id_user_organisateur', this.evenement.id_user_organisateur); // Append userId to the form data

    // Append the uploaded proof files
    for (let i = 0; i < this.evenement.preuves.length; i++) {
      formData.append('preuves', this.evenement.preuves[i]);
    }

    this.http.post('http://localhost:3000/api/events/create', formData).subscribe({
      next: (response: any) => {
        console.log('Événement créé avec succès:', response);
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['/accueil']);
        }, 5000); // Masquer le message après 5 secondes
      },
      error: (error: any) => {
        console.error('Erreur lors de la création de l\'événement:', error);
      }
    });
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.latitude = event.latLng.lat();
      this.longitude = event.latLng.lng();
      this.markerPosition = { lat: this.latitude, lng: this.longitude };
      this.evenement.lieu = `${this.latitude}, ${this.longitude}`;
      this.exactCoordinatesEntered = true;
    }
  }

  capitalizeTitle() {
    if (this.evenement.titre) {
      this.evenement.titre = this.evenement.titre.charAt(0).toUpperCase() + this.evenement.titre.slice(1);
    }
  }
}
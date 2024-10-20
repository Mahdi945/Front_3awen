import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  evenement = {
    nomOrganisateur: '',
    emailOrganisateur: '',
    titre: '',
    date: '',
    heure: '',
    lieu: '',
    description: '',
    volontaires: 0,
    preuves: [] as File[]
  };

  selectedFileNames: string[] = [];
  isModalOpen: boolean = false;
  showSuccessMessage: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

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
}
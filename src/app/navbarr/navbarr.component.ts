import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbarr',
  templateUrl: './navbarr.component.html',
  styleUrls: ['./navbarr.component.scss']
})
export class NavbarrComponent {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;

  constructor(public authService: AuthService, private http: HttpClient) {
    // Initialiser les valeurs des champs avec les données de l'utilisateur
    this.firstName = this.authService.getUserFirstName() || '';
    this.lastName = this.authService.getUserLastName() || '';
    this.phone = this.authService.getUserPhone() || '';
    this.city = this.authService.getUserCity() || '';
  }

  updateCredentials() {
    const userId = this.authService.getUserId(); // Assurez-vous que cette méthode existe dans AuthService
    const updateData = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      city: this.city
    };

    this.http.put(`http://localhost:3000/api/users/update/${userId}`, updateData).subscribe({
      next: (response) => {
        console.log('Informations utilisateur mises à jour avec succès', response);
        // Mettre à jour les informations dans AuthService si nécessaire
        this.authService.setUserFirstName(this.firstName);
        this.authService.setUserLastName(this.lastName);
        this.authService.setUserPhone(this.phone);
        this.authService.setUserCity(this.city);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour des informations utilisateur', error);
      }
    });
  }
}
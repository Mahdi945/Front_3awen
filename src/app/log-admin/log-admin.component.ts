import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import the AuthService
import { AuthGuard } from '../auth.guard'; // Import the AuthGuard

@Component({
  selector: 'app-log-admin',
  templateUrl: './log-admin.component.html',
  styleUrls: ['./log-admin.component.scss']
})
export class LogAdminComponent implements OnInit {
  errorMessage: string = ''; // Variable pour stocker le message d'erreur

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private authGuard: AuthGuard // Inject the AuthGuard
  ) {}

  ngOnInit(): void {
    // Set the flag to true when this component is accessed
    this.authGuard.setAccessedLogAdmin(true);
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      const adminCredentials = {
        adminId: form.value.adminId,
        password: form.value.password
      };

      // Log the credentials to verify the data being sent (remove this in production)
      console.log('Admin Credentials:', adminCredentials);

      // Réinitialisation du message d'erreur avant la tentative de connexion
      this.errorMessage = '';

      // Appel à l'API de login pour l'administrateur
      this.http.post<any>('http://localhost:3000/api/admin/login', adminCredentials)
        .subscribe(
          response => {
            console.log('Connexion réussie', response);
            // Store the JWT token and user info in localStorage (or sessionStorage)
            this.authService.login(response.token, response.user);
            this.router.navigate(['/admin']); // Redirection après connexion réussie
          },
          error => {
            console.error('Erreur lors de la connexion', error);
            // Afficher un message d'erreur à l'utilisateur si la connexion échoue
            if (error.status === 400 || error.status === 404) {
              this.errorMessage = 'ID ou mot de passe incorrect.';
            } else {
              this.errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
            }
          }
        );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs.';
    }
  }
}
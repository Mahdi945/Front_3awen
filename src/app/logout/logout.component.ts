import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'] // Correction de 'styleUrl' en 'styleUrls'
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    // Effectuer les actions de déconnexion, par exemple, supprimer le token d'authentification
    localStorage.removeItem('authToken'); // Suppression du token d'authentification du localStorage

    // Rediriger vers la page de login
    this.router.navigate(['/login']);
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {} // Inject AuthService

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    // Effectuer les actions de déconnexion
    this.authService.logout(); // Utiliser AuthService pour gérer la déconnexion

    // Rediriger vers la page d'accueil
    this.router.navigate(['/accueil']);
  }
}
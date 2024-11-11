import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Import the AuthService

@Component({
  selector: 'app-navbarr',
  templateUrl: './navbarr.component.html',
  styleUrls: ['./navbarr.component.scss']
})
export class NavbarrComponent {
  dropdownOpen = false;

  constructor(public authService: AuthService) {} // Inject the AuthService

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
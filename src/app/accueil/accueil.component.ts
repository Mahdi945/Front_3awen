import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  redirectToStripe() {
    window.location.href = 'https://buy.stripe.com/test_7sIbMG0fU6ub7ew3cc'; // Lien Stripe
  }
}

import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe('your-publishable-key-here');
  }

  async createPaymentIntent(amount: number): Promise<any> {
    const stripe = await this.stripePromise;
    if (!stripe) {
      throw new Error('Stripe.js has not loaded yet.');
    }

    // Call your backend to create a PaymentIntent
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount })
    });

    return response.json();
  }
  async getPayments(): Promise<any> {
    const response = await fetch('/get-payments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }
  

}
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

  async handlePayment(amount: number): Promise<void> {
    const stripe = await this.stripePromise;
    if (!stripe) {
      throw new Error('Stripe.js has not loaded yet.');
    }

    const { clientSecret } = await this.createPaymentIntent(amount);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          // Add card details here
        }
      }
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded!');
      }
    }
  }
}
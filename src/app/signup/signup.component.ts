import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  onRegister(form: NgForm) {
    if (form.valid) {
      const userData = {
        username: form.value.username,
        email: form.value.email,
        password: form.value.password
      };
      console.log('User Data:', userData);
      // Ajoutez ici la logique pour enregistrer l'utilisateur
    }
  }
}

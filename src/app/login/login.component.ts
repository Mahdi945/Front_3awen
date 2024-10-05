import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  onLogin(form: NgForm) {
    if (form.valid) {
      const credentials = {
        email: form.value.email,
        password: form.value.password
      };
      console.log('Credentials:', credentials);
      // Ajoutez ici la logique pour connecter l'utilisateur
    }
  }
}


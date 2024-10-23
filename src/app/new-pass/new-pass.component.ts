import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.scss']
})
export class NewPassComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = ''; // Message d'erreur pour la validation
  token: string = ''; // Jeton de réinitialisation

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer le token de l'URL
    this.token = this.route.snapshot.queryParams['token'];
  }

  // Fonction de soumission du formulaire
  onSubmit(form: NgForm) {
    if (form.valid && this.newPassword === this.confirmPassword) {
      const data = {
        newPassword: this.newPassword,  // changer 'password' à 'newPassword'
        token: this.token
      };
      

      // Appel à l'API pour réinitialiser le mot de passe
      this.http.post('http://localhost:3000/api/users/reset-password', data)
        .subscribe(
          (response: any) => {
            console.log('Mot de passe réinitialisé avec succès', response);
            // Rediriger vers la page de connexion après le succès
            this.router.navigate(['/login']);
          },
          (error: any) => {
            console.error('Erreur lors de la réinitialisation du mot de passe', error);
            // Afficher un message d'erreur si quelque chose ne va pas
            this.errorMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
          }
        );
    } else {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
    }
  }
}

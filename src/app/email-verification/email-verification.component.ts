import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  verificationMessage: string = '';
  isSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.verifyEmail(token);
    } else {
      this.verificationMessage = 'Token de vérification manquant.';
    }
  }

  verifyEmail(token: string): void {
    this.http.get(`http://localhost:3000/api/users/verify-email?token=${token}`)
      .subscribe({
        next: (response) => {
          this.verificationMessage = 'Votre email a été bien vérifié. Vous pouvez maintenant vous connecter.';
          this.isSuccess = true;
        },
        error: (error) => {
          console.error('Erreur lors de la vérification de l\'email', error);
          if (error.status === 404) {
            this.verificationMessage = 'Utilisateur non trouvé ou lien expiré.';
          } else if (error.status === 400) {
            this.verificationMessage = 'Lien de vérification déjà utilisé.';
          } else {
            this.verificationMessage = 'Erreur lors de la vérification de l\'email. Veuillez réessayer plus tard.';
          }
          this.isSuccess = false;
        }
      });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
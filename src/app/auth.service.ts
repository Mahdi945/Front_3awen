import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  // Méthode d'inscription
  register(userData: { firstName: string; lastName: string; email: string; password: string; phone: string; city: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey: string = 'auth-token';
  private userKey: string = 'user-info';

  constructor() {}

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  getUserEmail(): string | null {
    const userInfo = sessionStorage.getItem(this.userKey);
    return userInfo ? JSON.parse(userInfo).email : null;
  }

  getUserFirstName(): string | null {
    const userInfo = sessionStorage.getItem(this.userKey);
    return userInfo ? JSON.parse(userInfo).firstName : null;
  }

  getUserLastName(): string | null {
    const userInfo = sessionStorage.getItem(this.userKey);
    return userInfo ? JSON.parse(userInfo).lastName : null;
  }

  getUserPhone(): string | null {
    const userInfo = sessionStorage.getItem(this.userKey);
    return userInfo ? JSON.parse(userInfo).phone : null;
  }

  getUserCity(): string | null {
    const userInfo = sessionStorage.getItem(this.userKey);
    return userInfo ? JSON.parse(userInfo).city : null;
  }

  getUserId(): string | null {
    const userInfo = sessionStorage.getItem(this.userKey);
    return userInfo ? JSON.parse(userInfo)._id : null;
  }

  setUserFirstName(firstName: string): void {
    const userInfo = sessionStorage.getItem(this.userKey);
    if (userInfo) {
      const user = JSON.parse(userInfo);
      user.firstName = firstName;
      sessionStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  setUserLastName(lastName: string): void {
    const userInfo = sessionStorage.getItem(this.userKey);
    if (userInfo) {
      const user = JSON.parse(userInfo);
      user.lastName = lastName;
      sessionStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  setUserPhone(phone: string): void {
    const userInfo = sessionStorage.getItem(this.userKey);
    if (userInfo) {
      const user = JSON.parse(userInfo);
      user.phone = phone;
      sessionStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  setUserCity(city: string): void {
    const userInfo = sessionStorage.getItem(this.userKey);
    if (userInfo) {
      const user = JSON.parse(userInfo);
      user.city = city;
      sessionStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  login(token: string, user: any): void {
    sessionStorage.setItem(this.tokenKey, token);
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userKey);
  }
}
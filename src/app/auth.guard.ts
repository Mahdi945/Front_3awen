import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service'; // Import the AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private accessedLogAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    if (this.authService.isLoggedIn()) {
      if (url.includes('/admin')) {
        return this.checkAdminAccess();
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  private checkAdminAccess(): boolean {
    if (this.accessedLogAdmin) {
      return true;
    } else {
      this.router.navigate(['/log-admin']);
      return false;
    }
  }

  setAccessedLogAdmin(value: boolean): void {
    this.accessedLogAdmin = value;
  }
}
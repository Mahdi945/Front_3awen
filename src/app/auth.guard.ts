import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
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
    const accessedLogAdmin = localStorage.getItem('accessedLogAdmin') === 'true';
    if (accessedLogAdmin) {
      return true;
    } else {
      this.router.navigate(['/log-admin']);
      return false;
    }
  }

  setAccessedLogAdmin(value: boolean): void {
    localStorage.setItem('accessedLogAdmin', value.toString());
  }
}
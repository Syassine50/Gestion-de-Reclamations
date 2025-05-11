import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'ROLE_CLIENT') {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
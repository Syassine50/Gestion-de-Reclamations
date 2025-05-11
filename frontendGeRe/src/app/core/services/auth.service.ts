import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/appUser.interface';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:9090/api/auth';

  constructor(private http: HttpClient) {}

  register(appUser: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(`${this.baseUrl}/register`, appUser, {responseType: 'text' as 'json'});
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): AppUser | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }
}

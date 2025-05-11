import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/appUser.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = 'http://localhost:9090/api/auth';

  constructor(private http: HttpClient) {}


  register(appUser: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(`${this.baseUrl}/register`, appUser, {responseType: 'text' as 'json'});
  }

  login(data : any ): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  }
}

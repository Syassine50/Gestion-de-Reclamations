import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:9090/api/clients';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Client[]> {

    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }

    return this.http.get<Client[]>(this.baseUrl,{ headers, withCredentials: true });
  }

  getById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`);
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.baseUrl, client);
  }

  update(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/${id}`, client);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getByEmail(email: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/email/${email}`);
  }

  getByTelephone(telephone: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/telephone/${telephone}`);
  }
}

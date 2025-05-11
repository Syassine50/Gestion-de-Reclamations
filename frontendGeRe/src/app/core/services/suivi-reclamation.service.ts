import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuiviReclamation } from '../models/suivi-reclamation.interface';

@Injectable({
  providedIn: 'root'
})
export class SuiviReclamationService {
  private baseUrl = 'http://localhost:9090/api/suivis';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SuiviReclamation[]> {

    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }

    // Add withCredentials and headers to the cloned request 
    return this.http.get<SuiviReclamation[]>(this.baseUrl,{ headers, withCredentials: true });
  }

  getById(id: number): Observable<SuiviReclamation> {
    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.get<SuiviReclamation>(`${this.baseUrl}/${id}`,{ headers, withCredentials: true });
  }

  create(suivi: SuiviReclamation): Observable<SuiviReclamation> {
     const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.post<SuiviReclamation>(this.baseUrl, suivi,{ headers, withCredentials: true });
  }

  update(id: number, suivi: SuiviReclamation): Observable<SuiviReclamation> {
     const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.put<SuiviReclamation>(`${this.baseUrl}/${id}`, suivi,{ headers, withCredentials: true });
  }

  delete(id: number): Observable<void> {
     const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.delete<void>(`${this.baseUrl}/${id}`,{ headers, withCredentials: true });
  }

  getByReclamation(reclamationId: number): Observable<SuiviReclamation[]> {
     const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.get<SuiviReclamation[]>(`${this.baseUrl}/reclamation/${reclamationId}`,{ headers, withCredentials: true });
  }

  getByAgent(agentId: number): Observable<SuiviReclamation[]> {
     const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.get<SuiviReclamation[]>(`${this.baseUrl}/agent/${agentId}`,{ headers, withCredentials: true });
  }

  getByDate(date: string): Observable<SuiviReclamation[]> {
     const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.get<SuiviReclamation[]>(`${this.baseUrl}/date/${date}`,{ headers, withCredentials: true });
  }

  getByAction(action: string): Observable<SuiviReclamation[]> {
     const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.get<SuiviReclamation[]>(`${this.baseUrl}/action/${action}`,{ headers, withCredentials: true });
  }
}

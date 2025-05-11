import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/reclamation.interface';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private baseUrl = 'http://localhost:9090/api/reclamations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Reclamation[]> {
    
    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }

    // Add withCredentials and headers to the cloned request 
    return this.http.get<Reclamation[]>(this.baseUrl,{ headers, withCredentials: true });
  }

  getById(id: number): Observable<Reclamation> {

    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.get<Reclamation>(`${this.baseUrl}/${id}`,{ headers, withCredentials: true });
  }

  create(reclamation: Reclamation): Observable<Reclamation> {

    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }

    return this.http.post<Reclamation>(this.baseUrl, reclamation,{ headers, withCredentials: true });
  }

  update(id: number, reclamation: Reclamation): Observable<Reclamation> {

    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.put<Reclamation>(`${this.baseUrl}/${id}`, reclamation,{ headers, withCredentials: true });
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

  getByClient(clientId: number): Observable<Reclamation[]> {

    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.get<Reclamation[]>(`${this.baseUrl}/client/${clientId}`,{ headers, withCredentials: true });
  }

  getByAgent(agentId: number): Observable<Reclamation[]> {

    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.get<Reclamation[]>(`${this.baseUrl}/agent/${agentId}`,{ headers, withCredentials: true });
  }

  getByStatut(statut: string): Observable<Reclamation[]> {

    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.get<Reclamation[]>(`${this.baseUrl}/statut/${statut}`,{ headers, withCredentials: true });
  }

  getByProduit(produit: string): Observable<Reclamation[]> {

    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.get<Reclamation[]>(`${this.baseUrl}/produit/${produit}`,{ headers, withCredentials: true });
  }

  getByNote(note: number): Observable<Reclamation[]> {

    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.get<Reclamation[]>(`${this.baseUrl}/note/${note}`,{ headers, withCredentials: true });
  }

  getByDateRange(dateDebut: string, dateFin: string): Observable<Reclamation[]> {

    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.get<Reclamation[]>(`${this.baseUrl}/date?dateDebut=${dateDebut}&dateFin=${dateFin}`,{ headers, withCredentials: true });
  }

  assignAgent(reclamationId: number, agentId: number): Observable<Reclamation> {

    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.put<Reclamation>(`${this.baseUrl}/${reclamationId}/assigner/${agentId}`, {},{ headers, withCredentials: true });
  }

  getSatisfaction(): Observable<number> {

    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }
    return this.http.get<number>(`${this.baseUrl}/satisfaction`,{ headers, withCredentials: true });
  }
}

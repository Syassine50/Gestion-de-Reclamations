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
    return this.http.get<Reclamation>(`${this.baseUrl}/${id}`);
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
    return this.http.put<Reclamation>(`${this.baseUrl}/${id}`, reclamation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getByClient(clientId: number): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.baseUrl}/client/${clientId}`);
  }

  getByAgent(agentId: number): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.baseUrl}/agent/${agentId}`);
  }

  getByStatut(statut: string): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.baseUrl}/statut/${statut}`);
  }

  getByProduit(produit: string): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.baseUrl}/produit/${produit}`);
  }

  getByNote(note: number): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.baseUrl}/note/${note}`);
  }

  getByDateRange(dateDebut: string, dateFin: string): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.baseUrl}/date?dateDebut=${dateDebut}&dateFin=${dateFin}`);
  }

  assignAgent(reclamationId: number, agentId: number): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.baseUrl}/${reclamationId}/assigner/${agentId}`, {});
  }

  getSatisfaction(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/satisfaction`);
  }
}

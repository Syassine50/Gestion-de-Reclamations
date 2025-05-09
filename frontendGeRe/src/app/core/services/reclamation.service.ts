import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/reclamation.interface';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private baseUrl = 'http://localhost:9090/api/reclamations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.baseUrl);
  }

  getById(id: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${this.baseUrl}/${id}`);
  }

  create(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.baseUrl, reclamation);
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

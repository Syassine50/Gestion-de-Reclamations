import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuiviReclamation } from '../models/suivi-reclamation.interface';

@Injectable({
  providedIn: 'root'
})
export class SuiviReclamationService {
  private baseUrl = 'http://localhost:9090/api/suivis';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SuiviReclamation[]> {
    return this.http.get<SuiviReclamation[]>(this.baseUrl);
  }

  getById(id: number): Observable<SuiviReclamation> {
    return this.http.get<SuiviReclamation>(`${this.baseUrl}/${id}`);
  }

  create(suivi: SuiviReclamation): Observable<SuiviReclamation> {
    return this.http.post<SuiviReclamation>(this.baseUrl, suivi);
  }

  update(id: number, suivi: SuiviReclamation): Observable<SuiviReclamation> {
    return this.http.put<SuiviReclamation>(`${this.baseUrl}/${id}`, suivi);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getByReclamation(reclamationId: number): Observable<SuiviReclamation[]> {
    return this.http.get<SuiviReclamation[]>(`${this.baseUrl}/reclamation/${reclamationId}`);
  }

  getByAgent(agentId: number): Observable<SuiviReclamation[]> {
    return this.http.get<SuiviReclamation[]>(`${this.baseUrl}/agent/${agentId}`);
  }

  getByDate(date: string): Observable<SuiviReclamation[]> {
    return this.http.get<SuiviReclamation[]>(`${this.baseUrl}/date/${date}`);
  }

  getByAction(action: string): Observable<SuiviReclamation[]> {
    return this.http.get<SuiviReclamation[]>(`${this.baseUrl}/action/${action}`);
  }
}

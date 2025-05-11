import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agent } from '../models/agent.interface';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private baseUrl = 'http://localhost:9090/api/agents';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Agent[]> {
    const token = localStorage.getItem('token'); 
    let headers = new HttpHeaders( );
    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.append('Authorization', `Bearer ${encodeURIComponent(token)}`);
    }

    return this.http.get<Agent[]>(this.baseUrl,{ headers, withCredentials: true });
  }

  getById(id: number): Observable<Agent> {
    return this.http.get<Agent>(`${this.baseUrl}/${id}`);
  }

  create(agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(this.baseUrl, agent);
  }

  update(id: number, agent: Agent): Observable<Agent> {
    return this.http.put<Agent>(`${this.baseUrl}/${id}`, agent);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getByCompetence(competence: string): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.baseUrl}/competence/${competence}`);
  }
}

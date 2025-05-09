import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../../../core/services/reclamation.service';
import { Reclamation } from '../../../core/models/reclamation.interface';
import { MATERIAL_IMPORTS } from '../../../../material-imports';
import { MatDialog } from '@angular/material/dialog';
import { ReclamationFormComponent } from '../reclamation-form/reclamation-form.component';
import { ClientService } from '../../../core/services/client.service';
import { AgentService } from '../../../core/services/agent.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reclamations-list',
  standalone: true,
  imports: [MATERIAL_IMPORTS],
  templateUrl: './reclamations-list.component.html',
  styleUrls: ['./reclamations-list.component.scss']
})
export class ReclamationsListComponent implements OnInit {
  reclamations: any[] = [];
  filteredReclamations: any[] = [];
  search = '';
  displayedColumns = ['client', 'agent', 'description', 'statut', 'priorite', 'dateReclamation', 'actions'];

  constructor(
    private reclamationService: ReclamationService,
    private clientService: ClientService,
    private agentService: AgentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    forkJoin({
      reclamations: this.reclamationService.getAll(),
      clients: this.clientService.getAll(),
      agents: this.agentService.getAll()
    }).pipe(
      map(({ reclamations, clients, agents }) => {
        return reclamations.map(reclamation => ({
          ...reclamation,
          client: clients.find(c => c.id === reclamation.clientId)?.nom || 'Unknown',
          agent: agents.find(a => a.id === reclamation.agentId)?.nom || 'Unknown'
        }));
      })
    ).subscribe(data => {
      this.reclamations = data;
      this.filteredReclamations = data;
    });
  }

  applyFilter(): void {
    const filterValue = this.search.toLowerCase();
    this.filteredReclamations = this.reclamations.filter(reclamation =>
      reclamation.client.toLowerCase().includes(filterValue) ||
      reclamation.agent.toLowerCase().includes(filterValue) ||
      reclamation.description.toLowerCase().includes(filterValue) ||
      reclamation.statut.toLowerCase().includes(filterValue)
    );
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ReclamationFormComponent, {
      width: '600px',
      data: { 
        reclamation: {
          id: 0,
          description: '',
          statut: 'EN_ATTENTE',
          priorite: 'MOYENNE',
          dateReclamation: new Date(),
          clientId: null,
          agentId: null
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reclamationService.create(result).subscribe(() => {
          this.loadReclamations();
        });
      }
    });
  }

  openEditDialog(reclamation: Reclamation): void {
    const dialogRef = this.dialog.open(ReclamationFormComponent, {
      width: '600px',
      data: { reclamation: { ...reclamation } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reclamationService.update(result.id, result).subscribe(() => {
          this.loadReclamations();
        });
      }
    });
  }

  deleteReclamation(id: number): void {
    if (confirm('Are you sure you want to delete this reclamation?')) {
      this.reclamationService.delete(id).subscribe(() => {
        this.loadReclamations();
      });
    }
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString();
  }
}

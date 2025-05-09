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
  reclamations: Reclamation[] = [];
  filteredReclamations: Reclamation[] = [];
  search = '';
  displayedColumns = ['description', 'dateReclamation', 'statut', 'produit', 'note', 'actions'];

  constructor(
    private reclamationService: ReclamationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.reclamationService.getAll().subscribe(data => {
      this.reclamations = data;
      this.filteredReclamations = data;
    });
  }

  applyFilter(): void {
    const filterValue = this.search.toLowerCase();
    this.filteredReclamations = this.reclamations.filter(reclamation =>
      reclamation.description.toLowerCase().includes(filterValue) ||
      reclamation.statut.toLowerCase().includes(filterValue) ||
      reclamation.produit.toLowerCase().includes(filterValue)
    );
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ReclamationFormComponent, {
      width: '600px',
      data: { 
        reclamation: {
          description: '',
          dateReclamation: new Date().toISOString(),
          statut: 'EN_ATTENTE',
          produit: '',
          note: 0,
          clientId: null,
          agentId: null
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadReclamations();
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
        this.loadReclamations();
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

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}

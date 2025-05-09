import { Component, OnInit } from '@angular/core';
import { Agent } from '../../../core/models/agent.interface';
import { AgentService } from '../../../core/services/agent.service';
import { MATERIAL_IMPORTS } from '../../../../material-imports';
import { MatDialog } from '@angular/material/dialog';
import { AgentFormComponent } from '../agent-form/agent-form.component';
import { NotificationService } from '../../../core/services/notification.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  standalone: true,
  imports: [MATERIAL_IMPORTS, LoadingSpinnerComponent, ErrorMessageComponent],
  styleUrls: ['./agents-list.component.scss']
})
export class AgentsListComponent implements OnInit {
  agents: Agent[] = [];
  filteredAgents: Agent[] = [];
  search = '';
  displayedColumns = ['nom', 'prenom', 'competence', 'actions'];
  isLoading = false;
  error: string | null = null;

  constructor(
    private agentService: AgentService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    this.isLoading = true;
    this.error = null;
    this.agentService.getAll().pipe(
      catchError(err => {
        this.error = 'Failed to load agents. Please try again.';
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(data => {
      this.agents = data;
      this.filteredAgents = data;
    });
  }

  applyFilter(): void {
    const filterValue = this.search.toLowerCase();
    this.filteredAgents = this.agents.filter(agent =>
      agent.nom.toLowerCase().includes(filterValue) ||
      agent.prenom.toLowerCase().includes(filterValue) ||
      agent.competence.toLowerCase().includes(filterValue)
    );
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AgentFormComponent, {
      width: '500px',
      data: { agent: { id: 0, nom: '', prenom: '', competence: '' } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAgents();
      }
    });
  }

  openEditDialog(agent: Agent): void {
    const dialogRef = this.dialog.open(AgentFormComponent, {
      width: '500px',
      data: { agent: { ...agent } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAgents();
      }
    });
  }

  deleteAgent(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Agent',
        message: 'Are you sure you want to delete this agent? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        type: 'warn'
      }
    });

    dialogRef.afterClosed().pipe(
      switchMap(confirmed => {
        if (confirmed) {
          return this.agentService.delete(id).pipe(
            catchError(err => {
              this.notificationService.error('Failed to delete agent');
              return of(null);
            })
          );
        }
        return of(null);
      })
    ).subscribe(result => {
      if (result !== null) {
        this.notificationService.success('Agent deleted successfully');
        this.loadAgents();
      }
    });
  }
}

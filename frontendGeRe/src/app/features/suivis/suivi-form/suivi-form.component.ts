import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuiviReclamation } from '../../../core/models/suivi-reclamation.interface';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { InstantErrorStateMatcher } from '../../../shared/utils/error-state.matcher';
import { SuiviReclamationService } from '../../../core/services/suivi-reclamation.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ReclamationService } from '../../../core/services/reclamation.service';
import { AgentService } from '../../../core/services/agent.service';
import { catchError, finalize } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Reclamation } from '../../../core/models/reclamation.interface';
import { Agent } from '../../../core/models/agent.interface';

@Component({
  selector: 'app-suivi-form',
  standalone: true,
  imports: [MATERIAL_IMPORTS, LoadingSpinnerComponent],
  templateUrl: './suivi-form.component.html',
  styleUrls: ['./suivi-form.component.scss']
})
export class SuiviFormComponent {
  @Input() suivi: SuiviReclamation = {
    id: 0,
    action: '',
    date: '',
    reclamationId: 0,
    agentId: 0
  };
  @Output() save = new EventEmitter<SuiviReclamation>();

  isSubmitting = false;
  isLoading = true;
  errors: { [key: string]: string } = {};
  matcher = new InstantErrorStateMatcher();
  
  reclamations: Reclamation[] = [];
  agents: Agent[] = [];

  constructor(
    public dialogRef: MatDialogRef<SuiviFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { suivi: SuiviReclamation },
    private suiviService: SuiviReclamationService,
    private reclamationService: ReclamationService,
    private agentService: AgentService,
    private notificationService: NotificationService
  ) {
    this.suivi = { ...data.suivi };
    if (!this.suivi.date) {
      this.suivi.date = new Date().toISOString().split('T')[0];
    }
    this.loadDependencies();
  }

  private loadDependencies() {
    forkJoin({
      reclamations: this.reclamationService.getAll(),
      agents: this.agentService.getAll()
    }).pipe(
      catchError(err => {
        this.notificationService.error('Failed to load form data');
        return of({ reclamations: [], agents: [] });
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(({ reclamations, agents }) => {
      this.reclamations = reclamations;
      this.agents = agents;
    });
  }

  onSubmit(): void {
    this.errors = {};
    
    if (!this.validateForm()) return;
    
    this.isSubmitting = true;
    
    if (!this.suivi.id) {
      this.suivi = { ...this.suivi, id: undefined };
    }
    
    const operation = this.suivi.id
      ? this.suiviService.update(this.suivi.id, this.suivi)
      : this.suiviService.create(this.suivi);
    
    operation.pipe(
      catchError(err => {
        const errorMsg = typeof err.error === 'string' ? err.error : err.error?.message;
        this.notificationService.error(errorMsg || 'An error occurred while saving the follow-up');
        return of(null);
      }),
      finalize(() => this.isSubmitting = false)
    ).subscribe(result => {
      if (result) {
        this.notificationService.success(
          this.suivi.id ? 'Follow-up updated successfully' : 'Follow-up created successfully'
        );
        this.dialogRef.close(result);
      }
    });
  }

  validateForm(): boolean {
    let isValid = true;
    this.errors = {};

    if (!this.suivi.action?.trim()) {
      this.errors['action'] = 'Action is required';
      isValid = false;
    }

    if (!this.suivi.reclamationId) {
      this.errors['reclamationId'] = 'Reclamation is required';
      isValid = false;
    }

    if (!this.suivi.agentId) {
      this.errors['agentId'] = 'Agent is required';
      isValid = false;
    }

    if (!this.suivi.date) {
      this.errors['date'] = 'Date is required';
      isValid = false;
    }

    return isValid;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(field: string): string {
    return this.errors[field] || '';
  }

  hasError(field: string): boolean {
    return !!this.errors[field];
  }

  onFieldChange(field: string): void {
    if (this.errors[field]) {
      delete this.errors[field];
    }
  }
}

import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Agent } from '../../../core/models/agent.interface';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { InstantErrorStateMatcher } from '../../../shared/utils/error-state.matcher';
import { AgentService } from '../../../core/services/agent.service';
import { NotificationService } from '../../../core/services/notification.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-agent-form',
  standalone: true,
  imports: [MATERIAL_IMPORTS, LoadingSpinnerComponent],
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss']
})
export class AgentFormComponent {
  @Input() agent: Agent = { id: 0, nom: '', prenom: '', competence: '' };
  @Output() save = new EventEmitter<Agent>();
  isSubmitting = false;
  errors: { [key: string]: string } = {};
  matcher = new InstantErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<AgentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { agent: Agent },
    private agentService: AgentService,
    private notificationService: NotificationService
  ) {
    this.agent = { ...data.agent };
  }

  onSubmit(): void {
    this.errors = {};
    
    if (!this.validateForm()) return;
    
    this.isSubmitting = true;
    
    if (!this.agent.id) {
      this.agent = { ...this.agent, id: undefined };
    }
    
    const operation = this.agent.id
      ? this.agentService.update(this.agent.id, this.agent)
      : this.agentService.create(this.agent);
    
    operation.pipe(
      catchError(err => {
        const errorMsg = typeof err.error === 'string' ? err.error : err.error?.message;
        this.notificationService.error(errorMsg || 'An error occurred while saving the agent');
        return of(null);
      }),
      finalize(() => this.isSubmitting = false)
    ).subscribe(result => {
      if (result) {
        this.notificationService.success(
          this.agent.id ? 'Agent updated successfully' : 'Agent created successfully'
        );
        this.dialogRef.close(result);
      }
    });
  }

  validateForm(): boolean {
    let isValid = true;
    this.errors = {};

    if (!this.agent.nom?.trim()) {
      this.errors['nom'] = 'Last name is required';
      isValid = false;
    } else if (this.agent.nom.length < 2) {
      this.errors['nom'] = 'Last name must be at least 2 characters long';
      isValid = false;
    }

    if (!this.agent.prenom?.trim()) {
      this.errors['prenom'] = 'First name is required';
      isValid = false;
    } else if (this.agent.prenom.length < 2) {
      this.errors['prenom'] = 'First name must be at least 2 characters long';
      isValid = false;
    }

    if (!this.agent.competence?.trim()) {
      this.errors['competence'] = 'Competence is required';
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

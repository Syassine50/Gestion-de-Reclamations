import { Component, Inject } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reclamation } from '../../../core/models/reclamation.interface';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { InstantErrorStateMatcher } from '../../../shared/utils/error-state.matcher';
import { ReclamationService } from '../../../core/services/reclamation.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ClientService } from '../../../core/services/client.service';
import { AgentService } from '../../../core/services/agent.service';
import { catchError, finalize } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Client } from '../../../core/models/client.interface';
import { Agent } from '../../../core/models/agent.interface';

@Component({
  selector: 'app-reclamation-form',
  standalone: true,
  imports: [MATERIAL_IMPORTS, LoadingSpinnerComponent],
  templateUrl: './reclamation-form.component.html',
  styleUrls: ['./reclamation-form.component.scss']
})
export class ReclamationFormComponent {
  reclamation: Reclamation;
  isSubmitting = false;
  isLoading = true;
  errors: { [key: string]: string } = {};
  matcher = new InstantErrorStateMatcher();
  
  clients: Client[] = [];
  agents: Agent[] = [];

  constructor(
    public dialogRef: MatDialogRef<ReclamationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reclamation: Reclamation },
    private reclamationService: ReclamationService,
    private clientService: ClientService,
    private agentService: AgentService,
    private notificationService: NotificationService
  ) {
    this.reclamation = { ...data.reclamation };
    this.loadDependencies();
  }

  private loadDependencies() {
    this.isLoading = false
    this.clientService.getAll().subscribe((data)=>{
      this.clients = data;
    })
    this.agentService.getAll().subscribe((data)=>{
      this.agents = data;
    })
   /* forkJoin({
      clients: this.clientService.getAll(),
      agents: this.agentService.getAll()
    }).pipe(
      catchError(err => {
        this.notificationService.error('Failed to load form data');
        return of({ clients: [], agents: [] });
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(({ clients, agents }) => {
      this.clients = clients;
      console.log(clients);
      this.agents = agents;
    });*/
  }

  onSubmit(): void {
    this.errors = {};
    
    if (!this.validateForm()) return;
    
    this.isSubmitting = true;
    
    const operation = this.reclamation.id
      ? this.reclamationService.update(this.reclamation.id, this.reclamation)
      : this.reclamationService.create(this.reclamation);
    
    operation.pipe(
      catchError(err => {
        const errorMsg = typeof err.error === 'string' ? err.error : err.error?.message;
        this.notificationService.error(errorMsg || 'An error occurred while saving the reclamation');
        return of(null);
      }),
      finalize(() => this.isSubmitting = false)
    ).subscribe(result => {
      if (result) {
        this.notificationService.success(
          this.reclamation.id ? 'Reclamation updated successfully' : 'Reclamation created successfully'
        );
        this.dialogRef.close(result);
      }
    });
  }

  validateForm(): boolean {
    let isValid = true;

    if (!this.reclamation.description?.trim()) {
      this.errors['description'] = 'Description is required';
      isValid = false;
    }

    if (!this.reclamation.produit?.trim()) {
      this.errors['produit'] = 'Product is required';
      isValid = false;
    }

    if (!this.reclamation.statut?.trim()) {
      this.errors['statut'] = 'Status is required';
      isValid = false;
    }

    if (!this.reclamation.clientId) {
      this.errors['clientId'] = 'Client is required';
      isValid = false;
    }

    if (this.reclamation.note < 0 || this.reclamation.note > 5) {
      this.errors['note'] = 'Rating must be between 0 and 5';
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

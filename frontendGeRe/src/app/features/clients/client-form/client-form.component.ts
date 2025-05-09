import { Component, Inject } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../core/models/client.interface';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { InstantErrorStateMatcher } from '../../../shared/utils/error-state.matcher';
import { ClientService } from '../../../core/services/client.service';
import { NotificationService } from '../../../core/services/notification.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [MATERIAL_IMPORTS, LoadingSpinnerComponent],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {
  client: Client;
  isSubmitting = false;
  errors: { [key: string]: string } = {};
  matcher = new InstantErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
    private clientService: ClientService,
    private notificationService: NotificationService
  ) 
  {
    this.client = { ...data.client };
  }

  onSubmit(): void {
    this.errors = {};
  
    if (!this.validateForm()) return;
  
    this.isSubmitting = true;
  
    // Remove id if it's 0 or falsy to avoid sending it on creation
    if (!this.client.id) {
      this.client = { ...this.client, id: undefined };
    }
  
    console.log(this.client);
  
    const operation = this.client.id
      ? this.clientService.update(this.client.id, this.client)
      : this.clientService.create(this.client);
  
    operation.subscribe({
      next: result => {
        this.notificationService.success(
          this.client.id ? 'Client updated successfully' : 'Client created successfully'
        );
        this.dialogRef.close(result);
      },
      error: err => {
        const errorMsg = typeof err.error === 'string' ? err.error : err.error?.message;
  
        if (errorMsg?.includes('Un client avec cet email existe déjà')) {
          this.errors['email'] = 'This email is already registered';
          if (!this.client.id) this.client.email = '';
        } else if (errorMsg?.includes('Un client avec ce numéro de téléphone existe déjà')) {
          this.errors['telephone'] = 'This phone number is already registered';
          if (!this.client.id) this.client.telephone = '';
        } else {
          this.notificationService.error(errorMsg || 'An error occurred while saving the client');
        }
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
  
  

  validateForm(): boolean {
    let isValid = true;
    this.errors = {};

    if (!this.client.nom?.trim()) {
      this.errors['nom'] = 'Name is required';
      isValid = false;
    } else if (this.client.nom.length < 2) {
      this.errors['nom'] = 'Name must be at least 2 characters long';
      isValid = false;
    }

    if (!this.client.email?.trim()) {
      this.errors['email'] = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.client.email)) {
      this.errors['email'] = 'Please enter a valid email address';
      isValid = false;
    }

    if (!this.client.telephone?.trim()) {
      this.errors['telephone'] = 'Phone number is required';
      isValid = false;
    } else if (!this.isValidPhone(this.client.telephone)) {
      this.errors['telephone'] = 'Phone number must be 8 digits';
      isValid = false;
    }

    return isValid;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^\d{8}$/;
    return phoneRegex.test(phone);
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
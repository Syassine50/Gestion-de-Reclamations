import { Component, Inject, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../core/models/client.interface';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { InstantErrorStateMatcher } from '../../../shared/utils/error-state.matcher';
import { ClientService } from '../../../core/services/client.service';
import { NotificationService } from '../../../core/services/notification.service';
import { catchError, finalize, switchMap, of, Observable } from 'rxjs';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [MATERIAL_IMPORTS, LoadingSpinnerComponent],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  client: Client;
  isSubmitting = false;
  errors: { [key: string]: string } = {};
  matcher = new InstantErrorStateMatcher();
  originalEmail: string = '';
  originalPhone: string = '';

  constructor(
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
    private clientService: ClientService,
    private notificationService: NotificationService
  ) {
    this.client = { ...data.client };
  }

  ngOnInit(): void {
    this.originalEmail = this.client.email;
    this.originalPhone = this.client.telephone;
  }

  onSubmit(): void {
    this.errors = {};
    if (!this.validateForm()) return;

    this.isSubmitting = true;
    this.saveClient().pipe(
      catchError(err => {
        this.handleApiError(err);
        return of(null);
      }),
      finalize(() => this.isSubmitting = false)
    ).subscribe(result => {
      if (result) {
        this.notificationService.success(
          this.client.id ? 'Client updated successfully' : 'Client created successfully'
        );
        this.dialogRef.close(result);
      }
    });
  }

  saveClient(): Observable<any> {
    if (this.client.id) {
      return this.clientService.update(this.client.id, this.client);
    } else {
      return this.clientService.create(this.client);
    }
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

  private handleApiError(err: any): void {
    if (err.error) {
      if (typeof err.error === 'string') {
        if (err.error.includes('Un client avec cet email existe déjà')) {
          this.errors['email'] = 'This email is already registered';
        } else if (err.error.includes('Un client avec ce numéro de téléphone existe déjà')) {
          this.errors['telephone'] = 'This phone number is already registered';
        } else {
          this.notificationService.error(err.error);
        }
      } else if (err.error.message) {
        this.notificationService.error(err.error.message);
      } else {
        this.notificationService.error(
          `An error occurred while ${this.client.id ? 'updating' : 'creating'} the client`
        );
      }
    } else {
      this.notificationService.error(
        `An error occurred while ${this.client.id ? 'updating' : 'creating'} the client`
      );
    }
  }
}
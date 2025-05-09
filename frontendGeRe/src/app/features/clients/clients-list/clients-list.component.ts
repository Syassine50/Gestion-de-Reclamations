import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.interface';
import { MATERIAL_IMPORTS } from '../../../../material-imports';
import { MatDialog } from '@angular/material/dialog';
import { ClientFormComponent } from '../client-form/client-form.component';
import { NotificationService } from '../../../core/services/notification.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [MATERIAL_IMPORTS, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  search = '';
  displayedColumns = ['nom', 'email', 'telephone', 'actions'];
  isLoading = false;
  error: string | null = null;

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.isLoading = true;
    this.error = null;
    this.clientService.getAll().pipe(
      catchError(err => {
        this.error = 'Failed to load clients. Please try again.';
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(data => {
      this.clients = data;
      this.filteredClients = data;
    });
  }

  applyFilter(): void {
    const filterValue = this.search.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.nom.toLowerCase().includes(filterValue) ||
      client.email.toLowerCase().includes(filterValue)
    );
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '500px',
      data: { client: { id: 0, nom: '', email: '', telephone: '' } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClients();
      }
    });
  }

  openEditDialog(client: Client): void {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '500px',
      data: { client: { ...client } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClients();
      }
    });
  }

  deleteClient(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Client',
        message: 'Are you sure you want to delete this client? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        type: 'warn'
      }
    });

    dialogRef.afterClosed().pipe(
      switchMap(confirmed => {
        if (confirmed) {
          return this.clientService.delete(id).pipe(
            catchError(err => {
              this.notificationService.error('Failed to delete client');
              return of(null);
            })
          );
        }
        return of(null);
      })
    ).subscribe(result => {
      if (result !== null) {
        this.notificationService.success('Client deleted successfully');
        this.loadClients();
      }
    });
  }
}

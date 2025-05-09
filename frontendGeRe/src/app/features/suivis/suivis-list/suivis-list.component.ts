import { Component, OnInit } from '@angular/core';
import { SuiviReclamation } from '../../../core/models/suivi-reclamation.interface';
import { SuiviReclamationService } from '../../../core/services/suivi-reclamation.service';
import { MATERIAL_IMPORTS } from '../../../../material-imports';
import { MatDialog } from '@angular/material/dialog';
import { SuiviFormComponent } from '../suivi-form/suivi-form.component';
import { NotificationService } from '../../../core/services/notification.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-suivis-list',
  standalone: true,
  imports: [MATERIAL_IMPORTS, LoadingSpinnerComponent, ErrorMessageComponent],
  templateUrl: './suivis-list.component.html',
  styleUrls: ['./suivis-list.component.scss']
})
export class SuivisListComponent implements OnInit {
  suivis: SuiviReclamation[] = [];
  filteredSuivis: SuiviReclamation[] = [];
  search = '';
  displayedColumns = ['action', 'date', 'reclamationId', 'agentId', 'actions'];
  isLoading = false;
  error: string | null = null;

  constructor(
    private suiviService: SuiviReclamationService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadSuivis();
  }

  loadSuivis(): void {
    this.isLoading = true;
    this.error = null;
    this.suiviService.getAll().pipe(
      catchError(err => {
        this.error = 'Failed to load follow-ups. Please try again.';
        return of([]);
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(data => {
      this.suivis = data;
      this.filteredSuivis = data;
    });
  }

  applyFilter(): void {
    const filterValue = this.search.toLowerCase();
    this.filteredSuivis = this.suivis.filter(suivi =>
      suivi.action.toLowerCase().includes(filterValue)
    );
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(SuiviFormComponent, {
      width: '500px',
      data: { 
        suivi: {
          id: 0,
          action: '',
          date: new Date().toISOString().split('T')[0],
          reclamationId: 0,
          agentId: 0
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSuivis();
      }
    });
  }

  openEditDialog(suivi: SuiviReclamation): void {
    const dialogRef = this.dialog.open(SuiviFormComponent, {
      width: '500px',
      data: { suivi: { ...suivi } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSuivis();
      }
    });
  }

  deleteSuivi(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Follow-up',
        message: 'Are you sure you want to delete this follow-up? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        type: 'warn'
      }
    });

    dialogRef.afterClosed().pipe(
      switchMap(confirmed => {
        if (confirmed) {
          return this.suiviService.delete(id).pipe(
            catchError(err => {
              this.notificationService.error('Failed to delete follow-up');
              return of(null);
            })
          );
        }
        return of(null);
      })
    ).subscribe(result => {
      if (result !== null) {
        this.notificationService.success('Follow-up deleted successfully');
        this.loadSuivis();
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private duration = 5000; // 5 seconds

  constructor(private snackBar: MatSnackBar) {}

  success(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: this.duration,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  error(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: this.duration,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  info(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: this.duration,
      panelClass: ['info-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}
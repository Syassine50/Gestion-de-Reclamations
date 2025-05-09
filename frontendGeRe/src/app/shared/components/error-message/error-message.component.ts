import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card class="error-card">
      <mat-card-content>
        <div class="error-content">
          <mat-icon class="error-icon">error_outline</mat-icon>
          <div class="error-text">
            <h3>{{ title }}</h3>
            <p>{{ message }}</p>
          </div>
        </div>
        <div class="error-actions" *ngIf="retryAction">
          <button mat-raised-button color="primary" (click)="retryAction()">
            <mat-icon>refresh</mat-icon>
            Retry
          </button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .error-card {
      margin: 1rem;
      background-color: #fff5f5;
      border: 1px solid #fee2e2;
    }

    .error-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .error-icon {
      color: #dc2626;
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .error-text {
      h3 {
        margin: 0;
        color: #dc2626;
        font-size: 1.125rem;
      }

      p {
        margin: 0.5rem 0 0;
        color: #666;
      }
    }

    .error-actions {
      margin-top: 1rem;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() title = 'Error';
  @Input() message = 'An error occurred. Please try again.';
  @Input() retryAction?: () => void;
}
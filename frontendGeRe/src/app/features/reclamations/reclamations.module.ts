import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReclamationsListComponent } from './reclamations-list/reclamations-list.component';
import { ReclamationFormComponent } from './reclamation-form/reclamation-form.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ReclamationsListComponent,
    ReclamationFormComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule
  ]
})
export class ReclamationsModule { }

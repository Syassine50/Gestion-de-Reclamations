import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuivisListComponent } from './suivis-list/suivis-list.component';
import { SuiviFormComponent } from './suivi-form/suivi-form.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SuivisListComponent,
    SuiviFormComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule
  ]
})
export class SuivisModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatisfactionReportComponent } from './satisfaction-report/satisfaction-report.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SatisfactionReportComponent,
    MatCardModule,
    MatToolbarModule
  ]
})
export class ReportsModule { }

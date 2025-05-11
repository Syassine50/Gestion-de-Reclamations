import { Routes } from '@angular/router';
import { ClientsListComponent } from './features/clients/clients-list/clients-list.component';
import { AgentsListComponent } from './features/agents/agents-list/agents-list.component';
import { ReclamationsListComponent } from './features/reclamations/reclamations-list/reclamations-list.component';
import { SuivisListComponent } from './features/suivis/suivis-list/suivis-list.component';
import { SatisfactionReportComponent } from './features/reports/satisfaction-report/satisfaction-report.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: SatisfactionReportComponent },
  { path: 'clients', component: ClientsListComponent },
  { path: 'agents', component: AgentsListComponent },
  { path: 'reclamations', component: ReclamationsListComponent },
  { path: 'suivis', component: SuivisListComponent },
  { path: 'register', component: RegisterComponent }];

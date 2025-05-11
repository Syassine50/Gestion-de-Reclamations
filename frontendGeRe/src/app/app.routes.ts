import { Routes } from '@angular/router';
import { ClientsListComponent } from './features/clients/clients-list/clients-list.component';
import { AgentsListComponent } from './features/agents/agents-list/agents-list.component';
import { ReclamationsListComponent } from './features/reclamations/reclamations-list/reclamations-list.component';
import { SuivisListComponent } from './features/suivis/suivis-list/suivis-list.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ClientGuard } from './core/guards/client.guard';
import { AgentGuard } from './core/guards/agent.guard';
import { SatisfactionReportComponent } from './features/reports/satisfaction-report/satisfaction-report.component';

export const routes: Routes = [
  { path: 'clients', component: ClientsListComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'agents', component: AgentsListComponent, canActivate: [AuthGuard, AgentGuard] },
  { path: 'reclamations', component: ReclamationsListComponent, canActivate: [AuthGuard] },
  { path: 'suivis', component: SuivisListComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: SatisfactionReportComponent , canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

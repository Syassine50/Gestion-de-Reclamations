import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {   HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Root Component & Routing
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app_routing.module';

// Feature Modules
import { ClientsModule } from './features/clients/clients.module';
import { AgentsModule } from './features/agents/agents.module';
import { ReclamationsModule } from './features/reclamations/reclamations.module';
import { SuivisModule } from './features/suivis/suivis.module';
import { ReportsModule } from './features/reports/reports.module';

// Angular Material Shared Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';  
import { AppInterceptor } from './core/services/auth.interceptor';
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    ClientsModule,
    AgentsModule,
    MatMenu,
    ReclamationsModule,
    SuivisModule,
    ReportsModule,
    LoginComponent,
    RegisterComponent,
    AppComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

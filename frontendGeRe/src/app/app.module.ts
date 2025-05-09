import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Root Component & Routing
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    // Material (for nav)
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    // Feature Modules
    ClientsModule,
    AgentsModule,
    MatMenu,
    ReclamationsModule,
    SuivisModule,
    ReportsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

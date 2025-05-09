import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import { jsPDF } from 'jspdf';
import { firstValueFrom } from 'rxjs';

import { ReclamationService } from '../../../core/services/reclamation.service';
import { AgentService } from '../../../core/services/agent.service';
import { ClientService } from '../../../core/services/client.service';
import { NotificationService } from '../../../core/services/notification.service';

import { Reclamation } from '../../../core/models/reclamation.interface';
import { Agent } from '../../../core/models/agent.interface';
import { Client } from '../../../core/models/client.interface';

// Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

Chart.register(...registerables);

@Component({
  selector: 'app-satisfaction-report',
  standalone: true,
  templateUrl: './satisfaction-report.component.html',
  styleUrls: ['./satisfaction-report.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatRippleModule,
    MatTooltipModule
  ]
})
export class SatisfactionReportComponent implements OnInit, AfterViewInit {
  @ViewChild('pieCanvas') pieCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineCanvas') lineCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;

  loading = true;
  dateRange: FormGroup;

  avgSatisfaction = 0;
  satisfactionTrend = 0;
  totalClients = 0;
  newClients = 0;
  totalAgents = 0;
  activeAgents = 0;
  totalReclamations = 0;
  pendingReclamations = 0;

  private pieChart!: Chart;
  private lineChart!: Chart;
  private barChart!: Chart;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private reclamationService: ReclamationService,
    private agentService: AgentService,
    private clientService: ClientService,
    private notificationService: NotificationService
  ) {
    this.dateRange = this.fb.group({
      start: [new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)],
      end: [new Date()]
    });
  }

  ngOnInit() {
    this.loadDashboardData();
    this.dateRange.valueChanges.subscribe(() => {
      this.loadDashboardData();
    });
  }

  ngAfterViewInit() {
    this.initializeCharts();
  }

  private async loadDashboardData() {
    this.loading = true;
    try {
      const { start, end } = this.dateRange.value;

      const [reclamations, agents, clients] = await Promise.all([
        firstValueFrom(this.reclamationService.getAll()),
        firstValueFrom(this.agentService.getAll()),
        firstValueFrom(this.clientService.getAll())
      ]);

      this.totalReclamations = reclamations.length;
      this.pendingReclamations = reclamations.filter((r: Reclamation) => r.statut === 'EN_ATTENTE').length;
      this.totalAgents = agents.length;
      this.activeAgents = agents.filter((a: Agent) => a.actif).length;
      this.totalClients = clients.length;

      const satisfactionScores = reclamations.filter((r: Reclamation) => r.note).map((r: Reclamation) => r.note);
      this.avgSatisfaction = satisfactionScores.reduce((a: number, b: number) => a + b, 0) / satisfactionScores.length || 0;

      const previousScores = reclamations
        .filter((r: Reclamation) => r.note && new Date(r.dateReclamation).getTime() < new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
        .map((r: Reclamation) => r.note);
      const previousAvg = previousScores.reduce((a: number, b: number) => a + b, 0) / previousScores.length || 0;
      this.satisfactionTrend = previousAvg ? ((this.avgSatisfaction - previousAvg) / previousAvg) * 100 : 0;

      this.updateCharts(reclamations, agents);
    } catch (error) {
      this.notificationService.error('Erreur lors du chargement des données');
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  private initializeCharts() {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['En attente', 'En cours', 'Résolu', 'Fermé'],
        datasets: [{
          data: [0, 0, 0, 0],
          backgroundColor: ['#ff9800', '#2196f3', '#4caf50', '#9e9e9e']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' }
        }
      }
    });

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Réclamations',
          data: [],
          borderColor: '#2196f3',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Réclamations traitées',
          data: [],
          backgroundColor: '#4caf50'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  private updateCharts(reclamations: Reclamation[], agents: Agent[]) {
    const statusCounts: Record<string, number> = {
      'EN_ATTENTE': 0,
      'EN_COURS': 0,
      'RESOLU': 0,
      'FERME': 0
    };
    reclamations.forEach(r => {
      if (r.statut in statusCounts) statusCounts[r.statut]++;
    });
    this.pieChart.data.datasets[0].data = Object.values(statusCounts);
    this.pieChart.update();

    const dailyData = this.groupReclamationsByDate(reclamations);
    this.lineChart.data.labels = Array.from(dailyData.keys());
    this.lineChart.data.datasets[0].data = Array.from(dailyData.values());
    this.lineChart.update();

    const agentPerformance = this.calculateAgentPerformance(reclamations, agents);
    this.barChart.data.labels = agentPerformance.map(a => a.nom);
    this.barChart.data.datasets[0].data = agentPerformance.map(a => a.resolvedCount);
    this.barChart.update();
  }

  private groupReclamationsByDate(reclamations: Reclamation[]): Map<string, number> {
    const dailyData = new Map<string, number>();
    reclamations.forEach(r => {
      const date = new Date(r.dateReclamation).toLocaleDateString();
      dailyData.set(date, (dailyData.get(date) || 0) + 1);
    });
    return new Map([...dailyData.entries()].sort());
  }

  private calculateAgentPerformance(reclamations: Reclamation[], agents: Agent[]) {
    return agents.map(agent => ({
      nom: agent.nom,
      resolvedCount: reclamations.filter(r => r.agentId === agent.id && r.statut === 'RESOLU').length
    })).sort((a, b) => b.resolvedCount - a.resolvedCount).slice(0, 10);
  }

  showSatisfactionDetails() {}
  showClientsDetails() {}
  showAgentsDetails() {}
  showReclamationsDetails() {}

  async downloadChartAsPDF(chartType: 'pie' | 'line' | 'bar') {
    const chart = {
      pie: this.pieChart,
      line: this.lineChart,
      bar: this.barChart
    }[chartType];

    const canvas = chart.canvas;
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 100);
    pdf.save(`dashboard-${chartType}-chart.pdf`);
  }

  refreshChart(chartType: 'pie' | 'line' | 'bar') {
    this.loadDashboardData();
  }
  get startControl(): FormControl {
    return this.dateRange.get('start') as FormControl;
  }
  
  get endControl(): FormControl {
    return this.dateRange.get('end') as FormControl;
  }
  
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

import { ReclamationService } from '../../../core/services/reclamation.service';
import { ClientService } from '../../../core/services/client.service';
import { AgentService } from '../../../core/services/agent.service';
import { MATERIAL_IMPORTS } from '../../../../material-imports';

@Component({
  selector: 'app-satisfaction-report',
  standalone: true,
  imports: [MATERIAL_IMPORTS],
  templateUrl: './satisfaction-report.component.html',
  styleUrls: ['./satisfaction-report.component.scss']
})
export class SatisfactionReportComponent implements OnInit {
  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  avgSatisfaction = 0;
  totalClients = 0;
  totalAgents = 0;
  totalReclamations = 0;
  statusCounts: { [key: string]: number } = {};

  constructor(
    private reclamationService: ReclamationService,
    private clientService: ClientService,
    private agentService: AgentService
  ) {}

  ngOnInit(): void {
    this.reclamationService.getAll().subscribe(reclamations => {
      this.totalReclamations = reclamations.length;
      this.statusCounts = reclamations.reduce((acc, r) => {
        acc[r.statut] = (acc[r.statut] || 0) + 1;
        return acc;
      }, {} as any);

      this.renderChart();
    });

    this.reclamationService.getSatisfaction().subscribe(avg => this.avgSatisfaction = avg);
    this.clientService.getAll().subscribe(data => this.totalClients = data.length);
    this.agentService.getAll().subscribe(data => this.totalAgents = data.length);
  }

  renderChart(): void {
    const labels = Object.keys(this.statusCounts);
    const data = Object.values(this.statusCounts);

    this.chart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: ['#42a5f5', '#66bb6a', '#ef5350']
          }
        ]
      }
    });
  }
}

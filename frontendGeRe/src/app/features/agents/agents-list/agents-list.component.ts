import { Component, OnInit } from '@angular/core';
import { Agent } from '../../../core/models/agent.interface';
import { AgentService } from '../../../core/services/agent.service';
import { MATERIAL_IMPORTS } from '../../../../material-imports';

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
    standalone: true,
    imports: [MATERIAL_IMPORTS],
  styleUrls: ['./agents-list.component.scss']
})
export class AgentsListComponent implements OnInit {
  agents: Agent[] = [];
  filteredAgents: Agent[] = [];
  search = '';
  displayedColumns = ['nom', 'prenom', 'competence', 'actions'];

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.agentService.getAll().subscribe(data => {
      this.agents = data;
      this.filteredAgents = data;
    });
  }

  applyFilter(): void {
    const filterValue = this.search.toLowerCase();
    this.filteredAgents = this.agents.filter(agent =>
      agent.nom.toLowerCase().includes(filterValue) ||
      agent.competence.toLowerCase().includes(filterValue)
    );
  }

  deleteAgent(id: number): void {
    if (confirm('Delete this agent?')) {
      this.agentService.delete(id).subscribe(() => {
        this.agents = this.agents.filter(a => a.id !== id);
        this.applyFilter();
      });
    }
  }
}

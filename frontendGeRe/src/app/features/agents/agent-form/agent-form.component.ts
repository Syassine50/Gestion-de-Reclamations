import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Agent } from '../../../core/models/agent.interface';
import { MATERIAL_IMPORTS } from '../../../../material-imports';
@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',

  standalone: true,
  imports: [MATERIAL_IMPORTS],
  styleUrls: ['./agent-form.component.scss']
})
export class AgentFormComponent {
  @Input() agent: Agent = { id: 0, nom: '', prenom: '', competence: '' };
  @Output() save = new EventEmitter<Agent>();

  onSubmit(): void {
    this.save.emit(this.agent);
  }
}

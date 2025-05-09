import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SuiviReclamation } from '../../../core/models/suivi-reclamation.interface';
import { MATERIAL_IMPORTS } from '../../../../material-imports';

@Component({
  selector: 'app-suivi-form',
    standalone: true,
    imports: [MATERIAL_IMPORTS],
  templateUrl: './suivi-form.component.html',
  styleUrls: ['./suivi-form.component.scss']
})
export class SuiviFormComponent {
  @Input() suivi: SuiviReclamation = {
    id: 0,
    action: '',
    date: '',
    reclamationId: 0,
    agentId: 0
  };

  @Output() save = new EventEmitter<SuiviReclamation>();

  onSubmit(): void {
    this.save.emit(this.suivi);
  }
}

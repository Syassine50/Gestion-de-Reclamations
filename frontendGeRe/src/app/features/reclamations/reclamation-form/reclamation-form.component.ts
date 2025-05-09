import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Reclamation } from '../../../core/models/reclamation.interface';
import { MATERIAL_IMPORTS } from '../../../../material-imports';

@Component({
  selector: 'app-reclamation-form',
  templateUrl: './reclamation-form.component.html',
    standalone: true,
    imports: [MATERIAL_IMPORTS],
  styleUrls: ['./reclamation-form.component.scss']
})
export class ReclamationFormComponent {
  @Input() reclamation: Reclamation = {
    id: 0,
    description: '',
    dateReclamation: '',
    statut: '',
    produit: '',
    note: 0,
    clientId: 0
  };
  @Output() save = new EventEmitter<Reclamation>();

  onSubmit(): void {
    this.save.emit(this.reclamation);
  }
}

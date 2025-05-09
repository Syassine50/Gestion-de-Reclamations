import { Component, OnInit } from '@angular/core';
import { Reclamation } from '../../../core/models/reclamation.interface';
import { ReclamationService } from '../../../core/services/reclamation.service';
import { MATERIAL_IMPORTS } from '../../../../material-imports';

@Component({
  selector: 'app-reclamations-list',
    standalone: true,
    imports: [MATERIAL_IMPORTS],
  templateUrl: './reclamations-list.component.html',
  styleUrls: ['./reclamations-list.component.scss']
})
export class ReclamationsListComponent implements OnInit {
  reclamations: Reclamation[] = [];
  displayedColumns = ['produit', 'description', 'statut', 'note', 'actions'];

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.reclamationService.getAll().subscribe(data => {
      this.reclamations = data;
    });
  }

  deleteReclamation(id: number): void {
    if (confirm('Delete this reclamation?')) {
      this.reclamationService.delete(id).subscribe(() => {
        this.reclamations = this.reclamations.filter(r => r.id !== id);
      });
    }
  }
}

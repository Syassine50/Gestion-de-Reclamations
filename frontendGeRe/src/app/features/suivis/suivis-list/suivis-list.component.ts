import { Component, OnInit } from '@angular/core';
import { SuiviReclamation } from '../../../core/models/suivi-reclamation.interface';
import { SuiviReclamationService } from '../../../core/services/suivi-reclamation.service';
import { MATERIAL_IMPORTS } from '../../../../material-imports';

@Component({
  selector: 'app-suivis-list',
    standalone: true,
    imports: [MATERIAL_IMPORTS],
  templateUrl: './suivis-list.component.html',
  styleUrls: ['./suivis-list.component.scss']
})
export class SuivisListComponent implements OnInit {
  suivis: SuiviReclamation[] = [];
  displayedColumns = ['action', 'date', 'reclamationId', 'agentId', 'actions'];

  constructor(private suiviService: SuiviReclamationService) {}

  ngOnInit(): void {
    this.suiviService.getAll().subscribe(data => {
      this.suivis = data;
    });
  }

  deleteSuivi(id: number): void {
    if (confirm('Delete this suivi?')) {
      this.suiviService.delete(id).subscribe(() => {
        this.suivis = this.suivis.filter(s => s.id !== id);
      });
    }
  }
}

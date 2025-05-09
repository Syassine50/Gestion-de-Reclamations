import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.interface';
import { MATERIAL_IMPORTS } from '../../../../material-imports';

@Component({
  selector: 'app-clients-list',
    standalone: true,
    imports: [MATERIAL_IMPORTS],
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  search = '';
  displayedColumns = ['nom', 'email', 'telephone', 'actions'];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getAll().subscribe(data => {
      this.clients = data;
      this.filteredClients = data;
    });
  }

  applyFilter(): void {
    const filterValue = this.search.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.nom.toLowerCase().includes(filterValue) ||
      client.email.toLowerCase().includes(filterValue)
    );
  }

  deleteClient(id: number): void {
    if (confirm('Are you sure?')) {
      this.clientService.delete(id).subscribe(() => {
        this.clients = this.clients.filter(c => c.id !== id);
        this.applyFilter();
      });
    }
  }
}

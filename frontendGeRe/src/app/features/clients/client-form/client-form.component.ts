import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Client } from '../../../core/models/client.interface';
import { MATERIAL_IMPORTS } from '../../../../material-imports';

@Component({
  selector: 'app-client-form',
    standalone: true,
    imports: [MATERIAL_IMPORTS],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {
  @Input() client: Client = { id: 0, nom: '', email: '', telephone: '' };
  @Output() save = new EventEmitter<Client>();

  onSubmit(): void {
    this.save.emit(this.client);
  }
}

import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../material-imports';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    ...MATERIAL_IMPORTS
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontendGeRe';
}

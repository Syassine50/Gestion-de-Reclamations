import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../material-imports';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {}
 
  getUsername() {
    return  JSON.parse(localStorage.getItem('user')??'{\'username\':\'\'').username  ;
  }

logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.router.navigate(['/login']);
}
isAuthenticated() {
  return !!localStorage.getItem('token');   
}
}
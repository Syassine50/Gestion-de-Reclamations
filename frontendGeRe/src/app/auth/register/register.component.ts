import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { MATERIAL_IMPORTS } from '../../../material-imports';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MATERIAL_IMPORTS
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isClient = false;
  isAgent = false;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService , private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['ROLE_CLIENT', Validators.required],
      nom: [''],
      email: [''],
      telephone: [''],
      competence: ['']
    });

    this.onRoleChange();
  }

  onRoleChange() {
    const role = this.registerForm.value.role;
    this.isClient = role === 'ROLE_CLIENT';
    this.isAgent = role === 'ROLE_AGENT';

    // Reset irrelevant fields
    if (!this.isClient) {
      this.registerForm.patchValue({ email: '', telephone: '' });
    }
    if (!this.isAgent) {
      this.registerForm.patchValue({ competence: '' });
    }
  }

  onSubmit() {
    this.message = '';
    this.error = '';

    if (this.registerForm.invalid) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        console.log('SUCCESS RESPONSE:', res); // Debug
        this.message = res;
        this.registerForm.reset({ role: 'ROLE_CLIENT' });
        this.onRoleChange();

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {


        console.error('ERROR RESPONSE:', err); // Debug
        this.error = err.error?.message || 'Registration failed';
      }
    });
  }
}

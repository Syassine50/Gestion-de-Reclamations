import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { MATERIAL_IMPORTS } from '../../../material-imports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,

    ReactiveFormsModule, 
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isClient = false;
  isAgent = false;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['ROLE_CLIENT', Validators.required],
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
        this.message = res?.message || 'Registered successfully';
 // server returns string message
        this.registerForm.reset({ role: 'ROLE_CLIENT' });
        this.onRoleChange();
      },
      error: (err) => {
        this.error = err.error?.message || 'Registration failed';
      }
    });
  }
}

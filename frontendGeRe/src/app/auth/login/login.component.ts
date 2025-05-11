import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class LoginComponent {
  registerForm: FormGroup;
  isClient = false;
  isAgent = false;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService , private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }



  onSubmit() {
    this.message = '';
    this.error = '';

    if (this.registerForm.invalid) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    this.authService.login(this.registerForm.value).subscribe({
      next: (res: any) => {
        console.log('SUCCESS RESPONSE:', res); // Debug
        this.message = res;
        alert(res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {


        console.error('ERROR RESPONSE:', err); // Debug
        this.error = err.error?.message || 'Registration failed';
      }
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { LoginPayloadInterface } from '../interfaces/login-payload.interface';
import { AuthService } from '../services/auth-service';
import { SnackbarService } from '../services/snackbar-service';

@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackbarService = inject(SnackbarService);
  hidePassword: boolean = true;
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.loginForm.valid) {
      const loginPayload: LoginPayloadInterface = this.loginForm.getRawValue();
      this.authService.login(loginPayload).subscribe({
        next: (value: AuthResponse) => {
          this.authService.saveToken(value.token);
          this.authService.saveUserRole(value.role);
          this.authService.saveUser(value);
          this.snackbarService.show('User logged in successfully.', true);
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          console.error('Error:', err);
          this.snackbarService.show('User not found', false);
        },
        complete: () => {},
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

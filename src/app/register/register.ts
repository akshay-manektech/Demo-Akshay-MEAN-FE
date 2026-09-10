import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { RegisterPayloadInterface } from '../interfaces/register-payload.interface';
import { AuthService } from '../services/auth-service';
import { SnackbarService } from '../services/snackbar-service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackbarService = inject(SnackbarService);
  hidePassword: boolean = true;

  registerForm = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submit() {
    if (this.registerForm.valid) {
      const registerPayload: RegisterPayloadInterface = this.registerForm.getRawValue();
      this.authService.register(registerPayload).subscribe({
        next: (value: AuthResponse) => {
          this.authService.saveToken(value.token);
          this.authService.saveUserRole(value.role);
          this.authService.saveUser(value);
          this.snackbarService.show('User register successfully.', true);
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          console.error("err : ", err);
          if (err.error.message === 'user_already_exist') {
            this.snackbarService.show('User is already register with given email.', false);
          }else {
            this.snackbarService.show('Internal server error.', false);
          }
        },
        complete: () => {  },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}

import { Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth-guard';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { GuestGuard } from './Guards/guest-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard').then((m) => m.DashboardComponent),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];

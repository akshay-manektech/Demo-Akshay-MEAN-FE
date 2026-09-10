import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { LoginPayloadInterface } from '../interfaces/login-payload.interface';
import { RegisterPayloadInterface } from '../interfaces/register-payload.interface';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_ROLE = 'role';
  private readonly USER = 'userDetail';
  private router = inject(Router);
  private http = inject(HttpClient);
  private baseUrl = environment.baseURL;

  register(data: RegisterPayloadInterface): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/user/register`, data);
  }

  login(data: LoginPayloadInterface): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/user/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  saveUserRole(role: string) {
    localStorage.setItem(this.USER_ROLE, role);
  }

  saveUser(userDetail: AuthResponse) {
    localStorage.setItem(this.USER, JSON.stringify(userDetail));
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.USER_ROLE);
  }

  getUser(): AuthResponse | null {
    const user: AuthResponse = JSON.parse(localStorage.getItem(this.USER) || '');
    return user || null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getUserList(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.baseUrl}/user/list`);
  }
}

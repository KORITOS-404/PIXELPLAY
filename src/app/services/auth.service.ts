import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor() {
    const userData = this.getUserData();
    if (userData) {
      this.currentUserSubject.next(userData);
    }
  }
  
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setUserData(response);
          this.currentUserSubject.next(response);
        })
      );
  }
  
  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setUserData(response);
          this.currentUserSubject.next(response);
        })
      );
  }
  
  // MÉTODOS PARA RECUPERAR CONTRASEÑA
  enviarCodigoRecuperacion(correo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar-password/enviar-codigo`, { correo });
  }

  validarCodigo(correo: string, codigo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar-password/validar-codigo`, { correo, codigo });
  }

  cambiarPassword(correo: string, codigo: string, nuevaPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar-password/cambiar-password`, { 
      correo, 
      codigo, 
      nuevaPassword 
    });
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  
  getUserData(): AuthResponse | null {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
  
  private setUserData(user: AuthResponse): void {
    localStorage.setItem('userData', JSON.stringify(user));
  }
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
  isAdmin(): boolean {
    const user = this.getUserData();
    return user?.rol === 'ROLE_ADMIN';
  }
}

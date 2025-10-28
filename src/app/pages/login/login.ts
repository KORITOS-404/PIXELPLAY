import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/auth.model';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  credentials: LoginRequest = {
    correo: '',
    password: ''
  };
  
  errorMessage = '';
  errorType: 'error' | 'warning' | 'info' | null = null;
  isLoading = false;
  showError = false;
  
  onSubmit(): void {
    // Limpiar errores previos
    this.clearError();
    
    // Validar campos vacíos
    if (!this.credentials.correo || !this.credentials.password) {
      this.showErrorMessage('Por favor complete todos los campos', 'warning');
      return;
    }
    
    // Validar formato de correo básico
    if (!this.isValidEmail(this.credentials.correo)) {
      this.showErrorMessage('El formato del correo no es válido', 'warning');
      return;
    }
    
    this.isLoading = true;
    
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('✅ Login exitoso:', response);
        
        // Redirigir según el rol
        if (response.rol === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('❌ Error de login:', error);
        
        this.isLoading = false;
        
        // Manejar diferentes tipos de errores
        if (error.status === 401) {
          this.showErrorMessage('Correo o contraseña incorrectos', 'error');
        } else if (error.status === 0) {
          this.showErrorMessage('No se pudo conectar con el servidor. Verifique su conexión.', 'error');
        } else if (error.status === 500) {
          this.showErrorMessage('Error en el servidor. Intente más tarde.', 'error');
        } else {
          this.showErrorMessage('Error al iniciar sesión. Intente nuevamente.', 'error');
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
  // Mostrar mensaje de error con animación
  private showErrorMessage(message: string, type: 'error' | 'warning' | 'info') {
    this.errorMessage = message;
    this.errorType = type;
    this.showError = true;
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
      this.clearError();
    }, 5000);
  }
  
  // Limpiar error manualmente
  clearError() {
    this.showError = false;
    setTimeout(() => {
      this.errorMessage = '';
      this.errorType = null;
    }, 300); // Esperar a que termine la animación
  }
  
  // Validar formato de email
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/auth.model';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  // Datos del formulario
  registerData: RegisterRequest = {
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    direccion: '',
    telefono: ''
  };
  
  confirmPassword = '';
  errorMessage = '';
  isLoading = false;
  
  onSubmit(): void {
    // Validar campos vacíos
    if (!this.registerData.nombre || !this.registerData.apellido || 
        !this.registerData.correo || !this.registerData.password) {
      this.errorMessage = 'Por favor complete todos los campos obligatorios';
      return;
    }
    
    // Validar que las contraseñas coincidan
    if (this.registerData.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }
    
    // Validar longitud de contraseña
    if (this.registerData.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    // Llamar al servicio de registro
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('✅ Registro exitoso:', response);
        // Redirigir al home después del registro exitoso
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('❌ Error de registro:', error);
        
        // Mostrar error específico del backend
        if (error.error?.error) {
          this.errorMessage = error.error.error;
        } else if (error.error?.correo) {
          this.errorMessage = error.error.correo;
        } else {
          this.errorMessage = 'Error al registrar usuario. Intente nuevamente.';
        }
        
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
